import IMemory from "modloader64_api/IMemory";

interface IModule{
    memory: IMemory;
    size: number;
    name: string;
}

export default IModule;