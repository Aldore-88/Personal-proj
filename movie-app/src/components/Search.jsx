import React from 'react'


//descructuring object
// const person = {
//     name: 'Bevan Tan',
//     age: 31,
//     location: 'Melbourne'
// }
// const {name, age, location} = person;
// console.log(name) "Bevan Tan"

const Search = ({searchTerm, setSearchTerm}) => {
    return(
    //      <div className="text-white text-3xl">{searchTerm}</div>
        <div className = "search">
            <div>
                <img src="search.svg" alt="search" />
                <input
                    type="text"
                    placeholder="Search through thousands of movies!"
                    value={searchTerm}
                    onChange = {(event) => setSearchTerm(event.target.value)}
                    />
            </div>
        </div>
    )
}

export default Search