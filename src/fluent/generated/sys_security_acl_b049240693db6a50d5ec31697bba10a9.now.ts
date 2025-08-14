import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: 'b049240693db6a50d5ec31697bba10a9',
    script: ``,
    active: true,
    admin_overrides: true,
    decision_type: 'allow',
    local_or_existing: 'Local',
    type: 'client_callable_script_include',
    name: 'UniversityDataUtil',
    operation: 'execute',
    roles: ['03c1ef2e931ea290d5ec31697bba1032'],
})
