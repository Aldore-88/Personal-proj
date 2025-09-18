import React from 'react'


//descructuring object
// const person = {
//     name: 'Bevan Tan',
//     age: 31,
//     location: 'Melbourne'
// }
// const {name, age, location} = person;
// console.log(name) "Bevan Tan"

const Search = (searchTerm, setSearchTerm) => {
    return(
        <div className="text-white text-3xl">{searchTerm}</div>
    )
}

export default Search