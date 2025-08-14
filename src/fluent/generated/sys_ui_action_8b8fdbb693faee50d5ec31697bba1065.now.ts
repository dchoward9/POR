import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: '8b8fdbb693faee50d5ec31697bba1065',
    table: 'sys_ui_action',
    data: {
        action_name: 'show_flow_context',
        active: true,
        client: true,
        client_script_v2: `function onClick(g_form) {

}`,
        condition: 'g_scratchpad.flowData.hasFlows === true',
        form_action: true,
        form_button: false,
        form_button_v2: false,
        form_context_menu: false,
        form_link: true,
        form_menu_button_v2: false,
        format_for_configurable_workspace: false,
        isolate_script: true,
        list_action: false,
        list_banner_button: false,
        list_button: false,
        list_choice: false,
        list_context_menu: false,
        list_link: false,
        list_save_with_form_button: false,
        name: 'Flow Context',
        onclick: 'showFlowContext()',
        order: 209,
        script: `function showFlowContext () {
	var url;
	if (g_scratchpad.flowData.hasMultipleFlows === false && g_scratchpad.flowData.flowId !== "") {
		url = new GlideURL("/$flow-designer.do#/operations/context/" + g_scratchpad.flowData.flowId);
	} else {
		url = new GlideURL("sys_flow_context_list.do");
		url.addParam("sysparm_fixed_query", g_scratchpad.flowData.flowQuery);
	}

	g_navigation.open(url.getURL(), "_blank");
}`,
        show_insert: true,
        show_multiple_update: false,
        show_query: false,
        show_update: true,
        sys_domain: 'global',
        sys_domain_path: '/',
        sys_name: 'Flow Context',
        table: 'x_1118046_partne_0_requests',
        ui11_compatible: true,
        ui16_compatible: false,
    },
})
