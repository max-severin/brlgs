<?php

/*
 * Class shopBrandlogosPluginBackendSavelogosController
 * @author Max Severin <makc.severin@gmail.com>
 */
class shopBrandlogosPluginBackendSavelogosController extends waJsonController {

    public function execute() {

        $brand_logos_model = new shopBrandlogosPluginBrandlogosModel();

        $brand_id_array = waRequest::post('id', 0, 'array');
        $logo_array = waRequest::file('logo');

        foreach ($brand_id_array as $id) {
            $brand = array( 'id' => $id );
            $brand['logo'] = $logo_array[$id];
            
            $brand_logos_model->save($brand);
        }
        
        $this->redirect('?action=plugins#/brandlogos/');

    }

}