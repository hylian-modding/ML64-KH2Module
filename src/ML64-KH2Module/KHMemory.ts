import IMemory from "modloader64_api/IMemory";
import { IRomMemory } from "modloader64_api/IRomMemory";
import { ProcessObject, readMemory, writeMemory, readBuffer, writeBuffer, ModuleObject} from 'memoryjs';

export class KHMemory implements IMemory, IRomMemory{

    process!: ProcessObject
    module!: ModuleObject;
    fakeBack: Buffer = Buffer.alloc(1 * 1024 * 1024);
    baseAddr: number = 0;

    setProcess(process: ProcessObject, module?: ModuleObject){
        this.process = process;
        if (module !== undefined){
            this.baseAddr = module.modBaseAddr;
        }
        global.ModLoader["KH2"] = {};
        global.ModLoader.KH2["process"] = this.process;
    }

    romRead8(addr: number): number {
        return this.fakeBack.readUInt8(addr);
    }

    romWrite8(addr: number, value: number): void {
        this.fakeBack.writeUInt8(value, addr);
    }
    romRead16(addr: number): number {
        return this.fakeBack.readUInt16BE(addr);
    }

    romWrite16(addr: number, value: number): void {
        this.fakeBack.writeUInt16BE(addr, value);
    }

    romRead32(addr: number): number {
        return this.fakeBack.readUInt32BE(addr);
    }

    romWrite32(addr: number, value: number): void {
        this.fakeBack.writeUInt32BE(addr, value);
    }

    romReadBuffer(addr: number, size: number): Buffer {
        let buf = Buffer.alloc(size);
        this.fakeBack.copy(buf, 0, addr, addr + size);
        return buf;
    }

    romWriteBuffer(addr: number, buf: Buffer): void {
        buf.copy(this.fakeBack, addr, 0);
    }

    getRomBuffer(): ArrayBuffer {
        return this.fakeBack.buffer;
    }

    rdramRead8(addr: number): number {
        return readMemory(this.process.handle, this.baseAddr + addr, 'byte');
    }
    rdramWrite8(addr: number, value: number): void {
        writeMemory(this.process.handle, this.baseAddr + addr, value, 'byte');
    }
    rdramRead16(addr: number): number {
        return this.rdramReadBuffer(addr, 0x2).readUInt16BE(0);
    }
    rdramWrite16(addr: number, value: number): void {
        let buf = Buffer.alloc(0x2);
        buf.writeUInt16BE(value);
        this.rdramWriteBuffer(addr, buf);
    }
    rdramWrite32(addr: number, value: number): void {
        writeMemory(this.process.handle, this.baseAddr + addr, value, 'uint32');
    }
    rdramRead32(addr: number): number {
        return readMemory(this.process.handle, this.baseAddr + addr, 'uint32');
    }
    rdramRead64(addr: number): bigint{
        return readMemory(this.process.handle, this.baseAddr + addr, 'uint64');
    }
    rdramReadS64(addr: number): bigint{
        return readMemory(this.process.handle, this.baseAddr + addr, 'int64');
    }
    rdramWrite64(addr: number, value: bigint): void{
        writeMemory(this.process.handle, this.baseAddr + addr, value, 'uint64');
    }
    rdramWriteS64(addr: number, value: bigint): void{
        writeMemory(this.process.handle, this.baseAddr + addr, value, 'int64');
    }
    rdramReadBuffer(addr: number, size: number): Buffer {
        return readBuffer(this.process.handle, this.baseAddr + addr, size);
    }
    rdramWriteBuffer(addr: number, buf: Buffer): void {
        writeBuffer(this.process.handle, this.baseAddr + addr, buf);
    }
    dereferencePointer(addr: number): number {
        throw new Error("Method not implemented.");
    }
    rdramReadS8(addr: number): number {
        return this.rdramReadBuffer(addr, 0x1).readInt8(0);
    }
    rdramReadS16(addr: number): number {
        return readMemory(this.process.handle, this.baseAddr + addr, 'short');
    }
    rdramReadS32(addr: number): number {
        return readMemory(this.process.handle, this.baseAddr + addr, 'int32');
    }
    rdramReadBitsBuffer(addr: number, bytes: number): Buffer {
        throw new Error("Method not implemented.");
    }
    rdramReadBits8(addr: number): Buffer {
        throw new Error("Method not implemented.");
    }
    rdramReadBit8(addr: number, bitoffset: number): boolean {
        throw new Error("Method not implemented.");
    }
    rdramWriteBitsBuffer(addr: number, buf: Buffer): void {
        throw new Error("Method not implemented.");
    }
    rdramWriteBits8(addr: number, buf: Buffer): void {
        throw new Error("Method not implemented.");
    }
    rdramWriteBit8(addr: number, bitoffset: number, bit: boolean): void {
        throw new Error("Method not implemented.");
    }
    rdramReadPtr8(addr: number, offset: number): number {
        throw new Error("Method not implemented.");
    }
    rdramWritePtr8(addr: number, offset: number, value: number): void {
        throw new Error("Method not implemented.");
    }
    rdramReadPtr16(addr: number, offset: number): number {
        throw new Error("Method not implemented.");
    }
    rdramWritePtr16(addr: number, offset: number, value: number): void {
        throw new Error("Method not implemented.");
    }
    rdramWritePtr32(addr: number, offset: number, value: number): void {
        throw new Error("Method not implemented.");
    }
    rdramReadPtr32(addr: number, offset: number): number {
        throw new Error("Method not implemented.");
    }
    rdramReadPtrBuffer(addr: number, offset: number, size: number): Buffer {
        throw new Error("Method not implemented.");
    }
    rdramWritePtrBuffer(addr: number, offset: number, buf: Buffer): void {
        throw new Error("Method not implemented.");
    }
    rdramReadPtrS8(addr: number, offset: number): number {
        throw new Error("Method not implemented.");
    }
    rdramReadPtrS16(addr: number, offset: number): number {
        throw new Error("Method not implemented.");
    }
    rdramReadPtrS32(addr: number, offset: number): number {
        throw new Error("Method not implemented.");
    }
    rdramReadPtrBitsBuffer(addr: number, offset: number, bytes: number): Buffer {
        throw new Error("Method not implemented.");
    }
    rdramReadPtrBits8(addr: number, offset: number): Buffer {
        throw new Error("Method not implemented.");
    }
    rdramReadPtrBit8(addr: number, offset: number, bitoffset: number): boolean {
        throw new Error("Method not implemented.");
    }
    rdramWritePtrBitsBuffer(addr: number, offset: number, buf: Buffer): void {
        throw new Error("Method not implemented.");
    }
    rdramWritePtrBits8(addr: number, offset: number, buf: Buffer): void {
        throw new Error("Method not implemented.");
    }
    rdramWritePtrBit8(addr: number, offset: number, bitoffset: number, bit: boolean): void {
        throw new Error("Method not implemented.");
    }
    rdramReadF32(addr: number): number {
        return readMemory(this.process.handle, this.baseAddr + addr, 'float');
    }
    rdramReadPtrF32(addr: number, offset: number): number {
        throw new Error("Method not implemented.");
    }
    rdramWriteF32(addr: number, value: number): void {
        writeMemory(this.process.handle, this.baseAddr + addr, value, 'float');
    }
    rdramWritePtrF32(addr: number, offset: number, value: number): void {
        throw new Error("Method not implemented.");
    }
    bitCount8(value: number): number {
        throw new Error("Method not implemented.");
    }
    bitCount16(value: number): number {
        throw new Error("Method not implemented.");
    }
    bitCount32(value: number): number {
        throw new Error("Method not implemented.");
    }
    bitCountBuffer(buf: Buffer, off: number, len: number): number {
        throw new Error("Method not implemented.");
    }
    getRdramBuffer(): ArrayBuffer {
        return Buffer.alloc(0xFF).buffer;
    }
    invalidateCachedCode(): void {
    }
}