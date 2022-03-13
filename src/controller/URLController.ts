import { Request, Response } from 'express';
import shortId from 'shortid';
import { config } from '../config/Constants';


export class URLController  {
    public async shorten(req: Request, res: Response): Promise<void> {
        // ver se a URL já não existe
        // Criar o hash para essa URL
        const { originURL } = req.body;
        const hash = shortId.generate();
        const shortURL = `${config.API_URL}/${hash}`;

        // Salvar a URL no banco
        // Retornar a URL que a gente salvou
        res.json({
            originURL, 
            hash,
            shortURL
        })
    }

    public async redirect(req: Request, res: Response): Promise<void> {
        // Pegar hash da URL
        const { hash } = req.params;
        // Encontrar a URL original pelo hash
        const url = {
            originURL : "https://cloud.mongodb.com/v2/622def776432427a9faf9aaa#clusters",
            hash: "HJdGkpoZq",
            shortURL: "http://localhost:5000/HJdGkpoZq"
        }
        // Redirecionar para a URL original a partir do que encontramos no DB
        res.redirect(url.originURL)
    }
}
