export const Todo = (() => {


    const list = "http://localhost:3000/todos"

    let render = function (template, node) {
        node.innerHTML = template;
    };


const onClick =(e)=>{
    e.target.value
    console.log("clicked")
}

    const getList = () => {
        fetch(list)
            .then(response => response.json())
            .then(data => {
                const template = 
               
                data.map(task => {

                    if (task.isCompleted == true ){
                    console.log("here's your task", task)
                    return `
                    <span>
                   <p> ${task.content}</p>
                   <svg onClick={onClick} class = "icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="EditIcon" aria-label="fontSize small"><path d="M3 17.25V21h3.75L17.81 9.94l-3.75-3.75L3 17.25zM20.71 7.04c.39-.39.39-1.02 0-1.41l-2.34-2.34a.9959.9959 0 0 0-1.41 0l-1.83 1.83 3.75 3.75 1.83-1.83z"></path></svg>
                   <svg onClick={onClick} class = "icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="DeleteIcon" aria-label="fontSize small"><path d="M6 19c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V7H6v12zM19 4h-3.5l-1-1h-5l-1 1H5v2h14V4z"></path></svg>
                   <svg class = "icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowForwardIcon" aria-label="fontSize small"><path d="m12 4-1.41 1.41L16.17 11H4v2h12.17l-5.58 5.59L12 20l8-8z"></path></svg>
                   </span> 
                    
                    `
                }}).join(" ")
                        render(template, document.querySelector('.pending-task'));



            })




    }


    
    const completedList = () => {
        fetch(list)
            .then(response => response.json())
            .then(data => {
                const template = 
               
                data.map(task => {

                    if (task.isCompleted == false ){
                    console.log("here's your task", task)
                    return `
                    <span>
                    <svg class = "icon" focusable="false" aria-hidden="true" viewBox="0 0 24 24" data-testid="ArrowBackIcon" aria-label="fontSize small"><path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z"></path></svg>
                    <p> ${task.content}</p> 
                    </span>
                    
                    `
                }}).join(" ")
                        render(template, document.querySelector('.completed-task'));



            })



    }



    const getTask = (id) =>
        fetch([list, id].join("/")).then((response) =>
            response.json()
        );

    const deleteTask = (id) =>
        fetch([list, id].join("/"), {
            method: "DELETE",
        });

    const addTask = (newTask) =>
        fetch([list], {
            method: "POST",
            body: JSON.stringify(newTask),
            headers: {
                "Content-type": "application/json; charset=UTF-8",
            },
        })
            .then((response) => response.json());

    return {
        getList,
        getTask,
        deleteTask,
        addTask,
        completedList
    };
})();