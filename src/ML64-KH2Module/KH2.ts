import IConsole, { IConsoleDescriptor } from "modloader64_api/IConsole";
import IMemory from "modloader64_api/IMemory";
import { IRomHeader } from "modloader64_api/IRomHeader";
import ISaveState from "modloader64_api/ISaveState";
import IUtils from "modloader64_api/IUtils";
import { Debugger } from "modloader64_api/Sylvain/Debugger";
import { Gfx } from "modloader64_api/Sylvain/Gfx";
import {IImGui } from "modloader64_api/Sylvain/ImGui";
import { Input } from "modloader64_api/Sylvain/Input";
import { SDL } from "modloader64_api/Sylvain/SDL";
import { IYaz0 } from "modloader64_api/Sylvain/Yaz0";
import { getModules, ModuleObject, openProcess } from 'memoryjs';
import { KHHeader } from "./KHHeader";
import { KHMemory } from "./KHMemory";
import path from 'path';
import { ILogger } from "modloader64_api/IModLoaderAPI";
import IModule from "./IModule";
import { IRomMemory } from "modloader64_api/IRomMemory";
import { FakeRom } from 'modloader64_api/SidedProxy/FakeMemory';
import { ProxySide } from "modloader64_api/SidedProxy/SidedProxy";

export class KHHook implements IConsole {

    mem: KHMemory;
    lolMupen: any;
    modules: Map<string, IModule> = new Map<string, IModule>();

    constructor(logger: ILogger, lobby: string) {
        this.mem = new KHMemory();
        const processObject = openProcess('KINGDOM HEARTS II FINAL MIX.exe');
        this.mem.setProcess(processObject);
        // Sketchy shit
        let _md = require(path.resolve('./src/modloader/consoles/mupen/MupenDescriptor.js')).MupenDescriptor;
        let md: IConsoleDescriptor = new _md();
        this.lolMupen = md.constructConsole(ProxySide.CLIENT, "./emulator/mupen64plus.v64", logger, lobby);

        getModules(processObject.th32ProcessID).forEach((value: ModuleObject)=>{
            let mem = new KHMemory();
            mem.setProcess(processObject, value);
            this.modules.set(path.parse(value.szExePath).base, {memory: mem, size: value.modBaseSize, name: path.parse(value.szExePath).base});
        });
        logger.debug(`Generated ${this.modules.size} IMemory modules.`);
        Object.freeze(this.modules);
    }

    getInternalPlugin(): string {
        return "";
    }
    getRomAccess(): IRomMemory {
        return new FakeRom();
    }

    getModules(): Map<string, IModule> {
        return this.modules;
    }

    startEmulator(preStartCallback: Function): IMemory {
        this.lolMupen.startEmulator(preStartCallback);
        return this.mem;
    }

    stopEmulator(): void {
        this.lolMupen.stopEmulator();
    }

    softReset(): void {
        this.lolMupen.softReset();
    }

    hardReset(): void {
        this.lolMupen.hardReset();
    }

    saveState(file: string): void {
        this.lolMupen.saveState(file);
    }

    loadState(file: string): void {
        this.lolMupen.loadState(file);
    }

    finishInjects(): void {
        this.lolMupen.finishInjects();
    }

    isEmulatorReady(): boolean {
        return this.lolMupen.isEmulatorReady();
    }

    getLoadedRom(): Buffer {
        return this.lolMupen.getLoadedRom();
    }

    getRomOriginalSize(): number {
        return this.lolMupen.rom_size;
    }

    getRomHeader(): IRomHeader {
        return new KHHeader();
    }

    pauseEmulator(): void {
        this.lolMupen.pauseEmulator();
    }

    resumeEmulator(): void {
        this.lolMupen.resumeEmulator();
    }

    getMemoryAccess(): IMemory {
        return this.mem;
    }

    setSaveDir(path: string): void {
        this.lolMupen.setSaveDir(path);
    }

    getUtils(): IUtils {
        return this.lolMupen.getUtils();
    }

    getSaveStateManager(): ISaveState {
        return this.lolMupen.getSaveStateManager();
    }

    getFrameCount(): number {
        return this.lolMupen.getFrameCount();
    }

    setFrameCount(num: number): void {
    }

    on(which: string, callback: any): void {
        this.lolMupen.on(which, callback);
    }

    getImGuiAccess(): IImGui {
        return this.lolMupen.getImGuiAccess();
    }

    getSDLAccess(): SDL {
        return this.lolMupen.getSDLAccess();
    }

    getGfxAccess(): Gfx {
        return this.lolMupen.getGfxAccess();
    }

    getInputAccess(): Input {
        return this.lolMupen.getInputAccess();
    }

    getYaz0Encoder(): IYaz0 {
        return this.lolMupen.getYaz0Encoder();
    }

    getDebuggerAccess(): Debugger {
        return this.lolMupen.getDebuggerAccess();
    }

}