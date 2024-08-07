import { useState } from "react"
import '../pages/styling/dropdown.css'

export default function Dropdown() {
    const [selectedValue, setSelectedValue] = useState('')

    const handleChange = (e) => {
        setSelectedValue(e.target.value)
        
    }

    return (
        <div className="dropdown-container">
            <label>Year</label>
            <select id="dropdown-menu" value={selectedValue} onChange={handleChange}>
                <option value={2024}>2024</option>
                <option value={2023}>2023</option>
                <option value={2022}>2022</option>
                <option value={2021}>2021</option>
                <option value={2020}>2020</option>
                <option value={2019}>2019</option>
                <option value={2018}>2018</option>
                <option value={2017}>2017</option>
                <option value={2016}>2016</option>
                <option value={2015}>2015</option>
                <option value={2014}>2014</option>
                <option value={2013}>2013</option>
                <option value={2012}>2012</option>
                <option value={2011}>2011</option>
                <option value={2010}>2010</option>

            </select>
        </div>
    )
}