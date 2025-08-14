import { Acl } from '@servicenow/sdk/core'

export default Acl({
    $id: '6d4cfe7e933aee50d5ec31697bba10f0',
    script: ``,
    active: true,
    admin_overrides: false,
    decision_type: 'allow',
    description:
        'Grants execute access to the checkGroupMembership script include. This script is used by client scripts on the Service Catalog form to dynamically check if a user belongs to the approval exemption group.',
    local_or_existing: 'Existing',
    security_attribute: '9b3261650b170210f6146e1ef777b258',
    type: 'client_callable_script_include',
    name: 'checkGroupMembership',
    operation: 'execute',
})
