import { useState, useEffect } from 'react'
import collegeDetails from '../college'

function Search(props) {

    const [search, setSearch] = useState('#')

    useEffect(()=> {
        const searchedData = () => {
            const data = collegeDetails.filter((detail) => {
                return detail.college.name.toLowerCase().includes(search.toLowerCase())
            })
            
            props.onChecked(data)
        }

        searchedData()

    }, [search])

    const handleSearch = (event) => {
        setSearch(event.target.value)
    }

    return(
        <input 
        type='text' 
        onChange={handleSearch} 
        placeholder='search college name here..' 
        className='search'
        />
    )
}

export default Search