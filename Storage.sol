// SPDX-License-Identifier: MIT
pragma solidity ^0.8.28;

contract Storage {
    uint256 public myFavoriteNumber;

    uint256 public peopleCount;

    struct Person {
        uint256 favoriteNumber;
        string name;
    }

    Person[] public people;
    mapping(string => uint256) public nameToFavoriteNumber;

    mapping(string => bool) public nameExists;

    mapping(string => uint256) public nameToIndex;

    function store(uint256 _favoriteNuumber) public {
        myFavoriteNumber = _favoriteNuumber;
    }

    function retrieve() public view returns (uint256) {
        return myFavoriteNumber;
    }

    function addPerson(string memory _name, uint256 _favoriteNumber) public {
        if (!nameExists[_name]) {
            nameExists[_name] = true;
            people.push(Person(_favoriteNumber, _name));
            nameToFavoriteNumber[_name] = _favoriteNumber;
            nameToIndex[_name] = people.length - 1;
            peopleCount += 1;
        } else {
            uint256 index = nameToIndex[_name];
            nameToFavoriteNumber[_name] = _favoriteNumber;
            people[index].favoriteNumber = _favoriteNumber;
        }
    }
}
