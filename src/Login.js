import { useState } from "react";

export default function Login () {
    const [name, setName] = useState ('');

    const handleSubmit = (event) => {
        event.preventDefault();
        
    }
    return (
        <div>
            <div>
                <h1>Rock, Paper, Scissors</h1>
            </div>
            <div>
        <form onSubmit = {handleSubmit}>
            <label>
                Provide your Name:
                <input
                type = 'text'
                value = {name}
                onChange={(x) => setName(x.target.value)}
                />
            </label>
            <input type='submit' />
        </form>
        </div>
        </div>
    )

}
