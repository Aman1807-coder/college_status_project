import { useState, useEffect } from 'react'
import Heading from './heading.jsx'
import collegeDetails from "../college"
import Search from './search.jsx'
import Sort from './sort.jsx'

function Details() {

    const [filteredData, setFilteredData] = useState([])
    const [start, setStart] = useState(0)
    const [end, setEnd] = useState(6)

    const handleSearch = (arr) => {
        setFilteredData(() => [...arr])
    }

    const sortComparator = (key) => {
        return function(a, b) {
            if(key === 'reviews') {
                if (a.reviews.points < b.reviews.points) return -1;
                if (a.reviews.points > b.reviews.points) return 1;
                return 0;
            }

            if (a[key] < b[key]) return -1;
            if (a[key] > b[key]) return 1;
            return 0;
        }
    }

    const handleSort = (key) => {
        const arr = filteredData
        arr.sort(sortComparator(key))
        setFilteredData(() => [...arr])
    }


    useEffect(() => {
        const newArr = collegeDetails.slice(start, end)
        setFilteredData((prev) => [...prev, ...newArr])
    }, [start, end])

    const handleInfiniteScroll = () => {
        if (window.innerHeight + document.documentElement.scrollTop >=
            document.documentElement.scrollHeight) {
            setStart((prev) => prev + 6)
            setEnd((prev) => Math.min(prev + 6, collegeDetails.length))
        }
    }

    useEffect(() => {
        window.addEventListener('scroll', handleInfiniteScroll)
        return () => window.removeEventListener('scroll', handleInfiniteScroll)
    }, [])


    return (
        <div>
            <div className="flex-row">
                <Sort onChecked={handleSort} className='flex-cell'/>
                <Search onChecked={handleSearch} className='flex-cell'/>
            </div>
            <div className="flex-table">
                <Heading />
                {filteredData.map(({ cdRank, college, courseFees, placement,
                    reviews, ranking }) => {
                    return (
                        <div className="flex-row">
                            <div className='flex-cell'>{cdRank}</div>

                            <div className='flex-cell'>
                                <div className='college-block'>
                                    <img src={college.logo} alt='logo' className='logo' />
                                    <div className='other-detail'>
                                        <h3 className='clg-name'>{college.name}</h3>
                                        <p>{college.location}</p>
                                        <div className='box'>
                                            <h5 className='course'>{college.course}</h5>
                                            <h6>{`JEE - 2023 Cutoff : ${college.cutoff}`}</h6>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex-cell'>
                                <h3 className='text'>{courseFees}</h3>
                                <p>BE/B.Tech</p>
                                <span>-1st Year Fees</span>
                            </div>

                            <div className='flex-cell'>
                                <h3 className='text'>{placement.averagePackage}</h3>
                                <p>Average Package</p>
                                <h3 className='text'>{placement.highestPackage}</h3>
                                <p>Highest Package</p>
                            </div>

                            <div className='flex-cell'>
                                <h3>{`${reviews.points}/10`}</h3>
                                <p>{`Based on ${reviews.peopleCount} User reviews`}</p>
                            </div>

                            <div className='flex-cell'>
                                <h3>{`${ranking.rank}/${ranking.outof} in India`}</h3>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>

    )
}

export default Details