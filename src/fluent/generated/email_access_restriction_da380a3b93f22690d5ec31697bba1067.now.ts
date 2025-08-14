import { Record } from '@servicenow/sdk/core'

export default Record({
    $id: 'da380a3b93f22690d5ec31697bba1067',
    table: 'email_access_restriction',
    data: {
        conditions: 'approver=javascript:gs.getUserID()^EQ',
        description: 'Limit read access to only the approver',
        notification: '1da70e3b93f22690d5ec31697bba10ff',
        sys_name: '1da70e3b93f22690d5ec31697bba10ff',
    },
})
