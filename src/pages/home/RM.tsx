import React from 'react'
import Masonry from 'react-masonry-css'
import MyComponent from './MyComponent';
import MyComponent2 from './MyComponent2';
import "./rm.css"

function RM() {
    const items = [
        {
            id: 1,
            name: '1',
            comp: MyComponent2
        },
        {
            id: 2, name: '2',
            comp: MyComponent
        },
        {
            id: 3, name: '3',
            comp: MyComponent2
        },
        {
            id: 4, name: '4',
            comp: MyComponent
        },
        {
            id: 5, name: '5',
            comp: MyComponent
        },
        {
            id: 6, name: '6',
            comp: MyComponent
        },
        {
            id: 7, name: '7',
            comp: MyComponent2
        },
        {
            id: 8, name: '8',
            comp: MyComponent2
        },
        {
            id: 9, name: '9',
            comp: MyComponent2
        },
        {
            id: 10, name: '10',
            comp: MyComponent2
        },
        {
            id: 11, name: '11',
            comp: MyComponent2
        },
        {
            id: 12, name: '12',
            comp: MyComponent2
        },
        {
            id: 13, name: '13',
            comp: MyComponent
        },
        {
            id: 14, name: '14',
            comp: MyComponent
        },
        {
            id: 15, name: '15',
            comp: MyComponent
        },
        {
            id: 16, name: '16',
            comp: MyComponent
        },
        {
            id: 17, name: '17',
            comp: MyComponent
        },
        {
            id: 18, name: '18',
            comp: MyComponent2
        }
    ];

    // Convert array to JSX items
    const items1 = items.map(function (item) {
        const Comp = item.comp;
        return <div key={item.id}>{item.name}<Comp /></div>
    });


    return (
        <Masonry
            breakpointCols={{ default: 2 }}
            className="my-masonry-grid"
            columnClassName="my-masonry-grid_column"
        >
            {items1}
        </Masonry>
    )
}

export default RM
