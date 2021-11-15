import Adm from '../models/adm';
import ImageView from './image_view';

export default {
    render(adm: Adm) {
        return {
            id: adm.id,
            nome: adm.nome,
            nome_empresa: adm.nome_empresa,
            email: adm.email,
            chave_acesso: adm.chave_acesso,
            images: ImageView.renderMany(adm.images)
        }
    },

    renderMany(adms:  Adm[]){
        return adms.map(adm => this.render(adm));
    }
}