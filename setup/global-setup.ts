import "reflect-metadata";

export default async () => {
    console.log(process.env.JEST_WORKER_ID);
};
