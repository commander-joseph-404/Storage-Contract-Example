import { expect } from "chai";
import { network } from "hardhat";

const { ethers } = await network.connect();

describe("Storage Contract", function () {
  it("should store and retrieve a favorite number", async function () {
    // 1️⃣ Deploy the contract
    const Storage = await ethers.getContractFactory("Storage");
    const storage = await Storage.deploy();
    await storage.waitForDeployment();

    // 2️⃣ Store a value
    const tx = await storage.store(42);
    await tx.wait();

    // 3️⃣ Retrieve the value
    const value = await storage.retrieve();

    // 4️⃣ Assert (test)
    expect(value).to.equal(42n);
  });

  it("should add a person and store their favorite number", async function () {
  const Storage = await ethers.getContractFactory("Storage");
  const storage = await Storage.deploy();
  await storage.waitForDeployment();

  await storage.addPerson("Alice", 99);
  const person = await storage.people(0);

  expect(person.name).to.equal("Alice");
  expect(person.favoriteNumber).to.equal(99n);
});

 it("should not duplicate people with the same name", async function () {
  const Storage = await ethers.getContractFactory("Storage");
  const storage = await Storage.deploy();
  await storage.waitForDeployment();

  // Add Alice and update her number
  await storage.addPerson("Alice", 99);

  const length1 = await storage.peopleCount();
  expect(length1).to.equal(1n);
  
  // Add Bob
  await storage.addPerson("Bob", 55);

 const length2 = await storage.peopleCount();
 expect(length2).to.equal(2n);

  // Update Alice's number
  await storage.addPerson("Alice", 123);

  //Add Sola
  await storage.addPerson("Sola", 99);
  // Update Bob's number
  await storage.addPerson("Bob", 77);  

  const length3 = await storage.peopleCount();
  expect(length3).to.equal(3n);
  // Retrieve first person (Alice)
  const alice = await storage.people(0);
  expect(alice.name).to.equal("Alice");
  expect(alice.favoriteNumber).to.equal(123n); // updated

  // Retrieve second person (Bob)
  const bob = await storage.people(1);
  expect(bob.name).to.equal("Bob");
  expect(bob.favoriteNumber).to.equal(77n); // updated

  const sola = await storage.people(2);
  expect(sola.name).to.equal("Sola");
  expect(sola.favoriteNumber).to.equal(99n)

  console.log(`First Length: ${length1}`);
  console.log(`Second Length: ${length2}`);
  console.log(`Third Length: ${length3}`);
});
});
