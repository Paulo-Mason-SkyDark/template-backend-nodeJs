import { Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Adm from '../models/adm';
import AdmView from '../views/adm_view';
import * as Yup from 'yup';



export default {

    async index(request: Request, response: Response) {
        const admRepository = getRepository(Adm);

        const adms = await admRepository.find({ relations: ['images'] });

        return response.json(AdmView.renderMany(adms));
    },

    async show(request: Request, response: Response) {

        const { id } = request.params;

        const admRepository = getRepository(Adm);

        const adm = await admRepository.findOneOrFail(id, { relations: ['images'] });

        return response.json(AdmView.render(adm));
    },

    async delete(request: Request, response: Response) {

        const { id } = request.params;

        const admRepository = getRepository(Adm);

        const adm = await admRepository.findOneOrFail(id);
        const adms = await admRepository.find({ relations: ['images'] });
        adms.length !== 0 ? admRepository.delete(adm) : console.log("bla");

        return response.json(adm);
    },


    async create(request: Request, response: Response) {
        const {
            nome,
            nome_empresa,
            email,
            senha,
            chave_acesso
        } = request.body;

        const admRepository = getRepository(Adm);

        const requestImages = request.files as Express.Multer.File[];
        const images = requestImages.map(image => {
            return { path: image.filename }
        });

        const data = {
            nome,
            nome_empresa,
            email,
            senha,
            chave_acesso,
            images
        };

        const schema = Yup.object().shape({
            nome: Yup.string().required("Nome obrigatório"),
            nome_empresa: Yup.string().required("Nome da empresa obrigatório"),
            email: Yup.string().required("Email obrigatório").email(),
            senha: Yup.string().required("Senha obrigatório"),
            chave_acesso: Yup.string().required("Chave obrigatório"),
            images: Yup.array(Yup.object().shape({
                path: Yup.string(),
            }))
        });

        await schema.validate(data, {
            abortEarly: false,
        })

        const adm = admRepository.create(data);

        await admRepository.save(adm);

        return response.status(201).json({ adm })
    }
};