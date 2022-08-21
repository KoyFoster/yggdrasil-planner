
import React from "react"
import './index.css';

export const ClassIcon = ({ label, children }: { label?: string, children?: string }) => {

    return <div className="interface-icon">{label || children}</div>
}