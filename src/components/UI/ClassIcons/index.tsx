import React from "react"
import css from './style.css';

export const ClassIcon = ({ label, children }: { label?: string, children?: string }) => {
    return <div className={css["interface-icon"]}>
        <div>
            <label>{label || children}</label>
        </div>
    </div>
}