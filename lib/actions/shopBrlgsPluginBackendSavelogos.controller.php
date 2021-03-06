<?php

/*
 * Class shopBrlgsPluginBackendSavelogosController
 * @author Max Severin <makc.severin@gmail.com>
 */
class shopBrlgsPluginBackendSavelogosController extends waJsonController {

    public function execute() {

        $brand_logos_model = new shopBrlgsPluginBrlgsModel();

        $brand_id_array = waRequest::post('id', 0, 'array');
        $logo_array = waRequest::file('logo');

        foreach ($brand_id_array as $id) {
            $brand = array( 'id' => $id );
            $brand['logo'] = $logo_array[$id];
            
            $brand_logos_model->save($brand);
        }
        
        $this->redirect('?action=plugins#/brlgs/');

    }

}