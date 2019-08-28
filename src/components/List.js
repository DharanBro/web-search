import React from 'react'
import ListItem from './ListItem';

import { Store } from '../data/Store';

import styles from './List.module.css';


export default function List() {
    const { state } = React.useContext(Store);
    return (
        <div className={styles.suggestions}>
            {state.suggestions.map((s, i) => <ListItem
                className={`${styles.suggestionItem}${state.activeSuggestion === i ? ` ${styles.active}` : ''}`}
                key={s}
                data={s} />)}
        </div>
    )
}
