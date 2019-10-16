import classnames from 'classnames'
import moment from 'moment-mini'
import React from 'react'

import { label as labelStyle } from '../style/style.css'

import { filterButton } from './SearchBar.css'
import { timeSelector } from './DateSelector.css'


const hours = Array.apply(null, Array(24)).map((x, i) => {
  return {
    label: `${i.toString().padStart(2, '0')}:00`,
    value: i
  }
})


export const DateSelector = ({ className, label, value: datetime, onChange }) => {
  const currentDate = datetime.format('YYYY-MM-DD')
  const currentTime = datetime.hour()

  const updateDatetime = ({ date, time }) => {
    if (!date && !time) {
      return
    }

    let newTime = moment(datetime)

    if (date) {
      newTime = moment(date)
    }

    if (time) {
      newTime.hour(time)
    } else {
      newTime.hour(datetime.hour())
    }

    onChange(newTime)
  }

  return (
    <div className={classnames(filterButton, className)}>
      <label className={labelStyle}>{label}</label>

      <br />

      <div>
        <input type="date" value={currentDate} onChange={({ target: { value } }) => updateDatetime({ date: value })} />
        <select className={timeSelector} name={label} defaultValue={currentTime}>
          {hours.map(({ label, value }) => (
            <option
              key={label}
              value={value}
              onClick={() => updateDatetime({ time: value })}
            >
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}




