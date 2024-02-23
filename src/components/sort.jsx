
function Sort(props) {

    const handleSort = (event) => {
        props.onChecked(event.target.value)
    }

    return(
        <select onChange={handleSort} className='search'>
            <option value='cdRank' >----</option>
            <option value='cdRank' >College Duniya Rank</option>
            <option value='courseFees'>Fees</option>
            <option value='reviews'>User Review Points</option>
        </select>
    )
}

export default Sort