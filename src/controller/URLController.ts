import { URLModel } from 'database/model/URL';
import { Request, Response } from 'express';
import shortId from 'shortid';
import { config } from '../config/Constants';


export class URLController  {
    public async shorten(req: Request, res: Response): Promise<void> {
        
        const { originURL } = req.body;
        const url = await URLModel.findOne({originURL});
        
        if(url) {
            res.json(url);
            return
        }
        
        const hash = shortId.generate();
        const shortURL = `${config.API_URL}/${hash}`;
        const newURL = await URLModel.create({hash, shortURL, originURL})
        res.json(newURL);
    }

    public async redirect(req: Request, res: Response): Promise<void> {
        const { hash } = req.params;
        const url = {
            originURL : "https://cloud.mongodb.com/v2/622def776432427a9faf9aaa#clusters",
            hash: "HJdGkpoZq",
            shortURL: "http://localhost:5000/HJdGkpoZq"
        }
        res.redirect(url.originURL)
    }
}
