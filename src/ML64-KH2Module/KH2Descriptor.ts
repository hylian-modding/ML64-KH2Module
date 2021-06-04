import IConsole, { IConsoleDescriptor } from "modloader64_api/IConsole";
import { ILogger } from "modloader64_api/IModLoaderAPI";
import { ProxySide } from "modloader64_api/SidedProxy/SidedProxy";
import { FakeKH2 } from "./FakeKH2";
import { KHHook } from "./KH2";

export default class KH2Descriptor implements IConsoleDescriptor {

    constructConsole(side: ProxySide, rom: string, logger: ILogger, lobby: string): IConsole {
        switch (side) {
            case ProxySide.CLIENT:
                return new KHHook(logger, lobby);
            case ProxySide.SERVER:
                return new FakeKH2(rom, logger, lobby);
            default:
                return {} as any;
        }
    }

    getConsoleLabel(): string {
        return "KH2";
    }

}