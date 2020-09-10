import { useState } from 'react'

const  useCustomState = () => {
    const [state, setstate] = useState({});

    const handleChanger = e =>{
        e.persist();
        setstate(state=>({...state,[e.target.name]:e.target.value}));
    }

    return [state,handleChanger]
}

export default useCustomState;