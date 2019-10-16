import React, { useCallback, useState } from 'react'

import { BagSelector } from './BagSelector'
import { DateSelector } from './DateSelector'

import { item, hr } from '../style/style.css'
import { filtersWrapper } from './SearchBar.css'


const bagOptions = Array.apply(null, Array(20)).map((x, i) => i)



export const SearchBar = ({ bags, dropOff, pickUp, onUpdateQuery, onSearch }) => {
  const [searchVal, setSearchVal] = useState('london')

  const onSelectBags = useCallback(val => onUpdateQuery({ bags: val }))
  const onSelectDropOff = useCallback(val => onUpdateQuery({ dropOff: val }))
  const onSelectPickUp = useCallback(val => onUpdateQuery({ pickUp: val }))

  return (
    <>
      <input
        className={item}
        type="search"
        onChange={({ target: { value } }) => setSearchVal(value)} value={searchVal}
      />
      <button className={item} onClick={() => onSearch(searchVal)}>Search</button>

      <hr className={hr} />

      <div className={filtersWrapper}>
        <BagSelector className={item} value={bags} options={bagOptions} onSelect={onSelectBags}/>

        <DateSelector className={item} label="Drop off" value={dropOff} onChange={onSelectDropOff} />
        <DateSelector className={item} label="Pick up" value={pickUp} onChange={onSelectPickUp} />
      </div>
    </>
  )
}
