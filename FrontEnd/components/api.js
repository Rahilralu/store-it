export const signinfn = async (values) => {    
    const res = await fetch('http://localhost:7000/api/frontend/auth', {
        method : "POST",
        headers : { "Content-Type" : 'application/json'},
        body : JSON.stringify(values) 
    })
    return res.json();
}

