class TaskRunner {
    constructor(capacity){
        this.capacity = capacity;
        this.tasks = [];
        this.runningTask = 0;
    }

    async push(task){
        if(this.runningTask < this.capacity){
            await this.#runTask(task);
        }else{
            this.tasks.push(task);
        }
    }

    async #runTask(task){
        this.runningTask +=1;
        try{
            await task();
        }catch(e){
            console.error("Error While Runninbg Tasks :: ", e);
        }finally{
            this.runningTask -=1;
            if(this.tasks.length > 0){
                const newtask = this.tasks.shift();
                await this.#runTask(newtask);
            }
        }
    }
}


const f1 = async () => {
    console.log("task 1 starts");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
    console.log("task 1 ends");
};

const f2 = async () => {
    console.log("task 2 starts");
    await new Promise((resolve) => setTimeout(resolve, 500)); // Wait 0.5 second
    console.log("task 2 ends");
};

const f3 = async () => {
    console.log("task 3 starts");
    await new Promise((resolve) => setTimeout(resolve, 2500)); // Wait 2.5 seconds
    console.log("task 3 ends");
};

const f4 = async () => {
    console.log("task 4 starts");
    await new Promise((resolve) => setTimeout(resolve, 500)); // Wait 0.5 second
    console.log("task 4 ends");
};

const f5 = async () => {
    console.log("task 5 starts");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
    console.log("task 5 ends");
};
const f6 = async () => {
    console.log("task 6 starts");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
    console.log("task 6 ends");
};
const f7 = async () => {
    console.log("task 7 starts");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
    console.log("task 7 ends");
};
const f8 = async () => {
    console.log("task 8 starts");
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Wait 1 second
    console.log("task 8 ends");
};



const taskrunner  =  new TaskRunner(4);
taskrunner.push(f1);
taskrunner.push(f2);
taskrunner.push(f3);
taskrunner.push(f4);
taskrunner.push(f5);
taskrunner.push(f6);
taskrunner.push(f7);
taskrunner.push(f8);