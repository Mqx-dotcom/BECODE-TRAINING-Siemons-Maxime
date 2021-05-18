
//   ARRAY   //
todo = ["1. to see all your tasks", "2. to add a task", "3. to delete a task", "4. to mark a task as done", "5. to Exit the task manager"]; 
taskfree = ['get up', 'eat', 'code', 'eat', 'sleep'];
taskdone = ['test', 'done']

//  OUTPUT TASKS     //
console.log ("\n Welcome to your task manager, Press: \n");
console.log (` ${todo[0]}`)
console.log (` ${todo[1]}`)
console.log (` ${todo[2]}`)
console.log (` ${todo[3]}`)
console.log (` ${todo[4]}`)
console.log (`\nnb : tasks are case sensitive`)

//  USER INPUT + ANSWER  //
//  RL  ///
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

//  Q    //
const question = (str) => new Promise(resolve => rl.question(str, resolve));

// Recurrency TIME //
const steps = {
    start: async () => { 
        return steps.tasktodo();
    },
// 0 //
    tasktodo: async () => {
        const tasktodo = await question("\n\x1b[4m\x1b[33m What do you want to do ? :\x1b[0m\xa0");
        if (tasktodo === '1') { return steps.seeall(); }
        if (tasktodo === '2') { return steps.addtask(); }
        if (tasktodo === '3') { return steps.deltask(); }
        if (tasktodo === '4') { return steps.marktask(); }
        if (tasktodo === '5') { return steps.exittask(); }
        if (tasktodo === 'help' || tasktodo === '!help' ) { 
            console.log("\nAvailable commands, write :")
            console.log(todo)
            return steps.start(); }
        if (tasktodo === '!q') { return steps.end(); }
        console.log('You entered a wrong number, try again !');
        return steps.start();
    },
// 1 //
    seeall: async () => {
        const seeallq = await question("\n Which list do you want to see? type :\x1b[31m todo/\x1b[32mdone/\x1b[33mall :\xa0 \x1b[0m");
        if (seeallq === '!q') { return steps.end(); }
        if (seeallq === 'all') { 
            console.log("\nTo Do list : " + `${taskfree}`);
            console.log("Done List: " + `${taskdone}`); }
        if (seeallq === 'todo') { console.log("\nTo Do list : " + `${taskfree}`); }
        if (seeallq === 'done') { 
            if (taskdone.length === 0) {console.log("! Marked list is empty !"); }
            if (taskdone.length > 0) {console.log("\nDone List : " + `${taskdone}`); }}
        if (seeallq != 'all' && seeallq != 'todo' && seeallq != 'done') {
            console.log("Wrong list, please use 'todo','done' or 'all'");
            return steps.seeall();}
        return steps.start();
    },
// 2 //
    addtask: async () => {
        const additem = await question("\n What do you want to\x1b[31m add:\x1b[0m\xa0 ");
        if (additem === '!q') { return steps.end(); }
        if (additem.length === 0) {
            console.log("Field is empty, please write a task")
            return steps.addtask();
            }
        const count = taskfree.push(`${additem}`);
        console.log("\nTo Do list : " + `${taskfree}`);
        console.log("N° of tasks To Do : " + `${count}`);
        return steps.start();
    },
// 3 //
    deltask: async () => {
        const dellitem = await question("\n What do you want to\x1b[31m delete:\x1b[0m\xa0 ");
        if (dellitem === '!q') { return steps.end(); }
        if (dellitem.length === 0) {
            console.log("Error : Field is empty")
            return steps.deltask();
            }
        var delIndex = taskfree.indexOf(`${dellitem}`);
        const checkarray = taskfree.includes(`${dellitem}`);
        if (checkarray === false) {
            console.log("Error : Task not found")
            const quittask = await question("Would you like to exit the delete task part? Please type \x1b[32m yes /\x1b[31m no: \x1b[0m ");
            if (quittask === 'no' || quittask === 'n') 
            {   console.log("\nSmall reminder of the current lists:")
                console.log("\nTo Do list : " + `${taskfree}`);
                return steps.deltask(); }
            if (quittask  === 'yes'|| quittask === 'y') 
            { return steps.start(); }
            return steps.deltask();
            }
        taskfree.splice(delIndex, 1);
        console.log("\nCurrent To Do list : " + `${taskfree}`);
        console.log("Number of tasks To Do : " + `${delIndex}`);
        return steps.start();
      },
// 4 //
    marktask: async () => {
        const delmarkitem = await question("\n What do you want to\x1b[31m mark as done? :\x1b[0m\xa0 ");
        if (delmarkitem === '!q') { return steps.end(); }
        if (delmarkitem.length === 0) {
            console.log("Error : Field is empty")
            return steps.marktask();
            }
        var delmarkIndex = taskfree.indexOf(`${delmarkitem}`);
        const checkarray = taskfree.includes(`${delmarkitem}`);
        if (checkarray === false) {
            console.log("Error : Task not found")
            const quittask = await question("Would you like to exit the mark task part? Please type \x1b[32m yes /\x1b[31m no: \x1b[0m ");
            if (quittask === 'no' || quittask === 'n') 
            {   console.log("\nSmall reminder of the current lists:")
                console.log("\nTo Do list : " + `${taskfree}`);
                console.log("Done List : " + `${taskdone}`); 
                return steps.marktask(); }
            if (quittask  === 'yes'|| quittask === 'y') 
            { return steps.start(); }
            return stepsmarktask();
            }
        taskfree.splice(delmarkIndex, 1);
        const count = taskdone.push(`${delmarkitem}`);
        console.log("\nNew To Do list : " + `${taskfree}`);
        console.log("Task already done : " + `${taskdone}`);
        console.log("Number of task marked : " + `${count}`);
        return steps.start();
      },
// 5 //
    exittask: async () => {
        const quittask = await question("\n Would you like to\x1b[31m exit\x1b[0m the task manager? Please type \x1b[32m yes /\x1b[31m no: \x1b[0m");
        if (quittask === '!q') { return steps.end(); }
        if (quittask === 'no' || quittask === 'n') 
        { return steps.start(); }
        if (quittask  === 'yes'|| quittask === 'y') 
        { return steps.end(); }
        if (quittask != 'yes' && quittask != 'y' && quittask != 'no' && quittask != 'n') {
            console.log("Wrong answer, answer by 'yes' or 'no'");
        return steps.exittask();}
        return steps.end();
      },
// EXIT&CLOSE //
    end: async () => {
    console.log('\n \x1b[31m Cya, May the force be with you !\x1b[0m');
      rl.close();
    },
  };

  steps.start();



