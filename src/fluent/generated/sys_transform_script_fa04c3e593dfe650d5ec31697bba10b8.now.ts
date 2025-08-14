import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: 'fa04c3e593dfe650d5ec31697bba10b8',
    table: 'sys_transform_script',
    data: {
        active: true,
        map: 'f604c32593dfe650d5ec31697bba10c8',
        order: 100,
        script: `if (action == 'insert') 
    ignore = true;`,
        sys_name: 'onBefore',
        when: 'onBefore',
    },
})
