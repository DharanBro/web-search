import React from 'react'

export default function ListItem({ data, className }) {
    return (
        <div className={className}>
            {data}
        </div>
    )
}
