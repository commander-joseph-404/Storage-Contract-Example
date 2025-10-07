import { buildModule } from "@nomicfoundation/hardhat-ignition/modules";

export default buildModule("StorageModule", (m) => {
    const storage = m.contract("Storage");

    m.call(storage, "store", [42n]);

    m.call(storage, "retrieve");

    return { storage };
})
