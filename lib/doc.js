import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { remark } from "remark";
import html from "remark-html";



const postDirectory= path.join(process.cwd(), "docs");

export function getDocuments(){  
    console.log(postDirectory);
    const filenames = fs.readdirSync(postDirectory);

    const allDocuments= filenames.map(filename=>{
        const id= filename.replace(".md", "");

        const fullPath= path.join(postDirectory, filename);

        const fileContents= fs.readFileSync(fullPath,"utf-8");

        const matterResult= matter(fileContents);
        console.log(matterResult);
        return {
            id,
            ...matterResult.data,
        }
    })

    return allDocuments.sort((a,b)=>{
        if(a.order<b.order){
            return -1;
        }
        if(a.order>b.order){
            return 1;
        }
        return 0;
    })
}


