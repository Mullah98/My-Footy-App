import { useState } from "react"
import '../styling/dropdown.css'

export default function Dropdown({changeSeason}) {
    const [selectedValue, setSelectedValue] = useState('')

    const handleChange = (e) => {
        const newValue = e.target.value
        setSelectedValue(newValue)
        changeSeason(newValue)
    }

    return (
        <div className="dropdown-container">
            <label>Season: </label>
            <select className="dropdown-menu" value={selectedValue} onChange={handleChange}>
                <option value={2024}>2024/25</option>
                <option value={2023}>2023/24</option>
                <option value={2022}>2022/23</option>
                <option value={2021}>2021/22</option>
                <option value={2020}>2020/21</option>
                <option value={2019}>2019/20</option>
                <option value={2018}>2018/19</option>
                <option value={2017}>2017/18</option>
                <option value={2016}>2016/17</option>
                <option value={2015}>2015/16</option>
                <option value={2014}>2014/15</option>
                <option value={2013}>2013/14</option>
                <option value={2012}>2012/13</option>
                <option value={2011}>2011/12</option>
                <option value={2010}>2010/11</option>
            </select>
        </div>
    )
}