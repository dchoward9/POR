import "@servicenow/sdk/global";

declare global {
    namespace Now {
        namespace Internal {
            interface Keys extends KeysRegistry {
                explicit: {
                        "package_json": {
                            "table": "sys_module",
                            "id": "647a71a53401483baca7a91441a352a2"
                        }
                    };
                composite: [
                        {
                            "table": "sys_security_acl_role",
                            "id": "01ab9ce7932aae10d5ec31697bba1021",
                            "key": {
                                "sys_security_acl": "ebcad4a7932aae10d5ec31697bba1033",
                                "sys_user_role": "03c1ef2e931ea290d5ec31697bba1032"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "0a2c9c2b932aae10d5ec31697bba10d8",
                            "key": {
                                "sys_security_acl": "c52c9c2b932aae10d5ec31697bba10d2",
                                "sys_user_role": "03c1ef2e931ea290d5ec31697bba1032"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "0be005fd93fe6a50d5ec31697bba108d",
                            "key": {
                                "sys_security_acl": "b1e089fd93fe6a50d5ec31697bba10ee",
                                "sys_user_role": "f2c1af2e931ea290d5ec31697bba10fa"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "0df3eed193bee650d5ec31697bba1031",
                            "key": {
                                "sys_security_acl": "1cf36ed193bee650d5ec31697bba10de",
                                "sys_user_role": "03c1ef2e931ea290d5ec31697bba1032"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "0ef1fb29937a6a50d5ec31697bba10e7",
                            "key": {
                                "sys_security_acl": "1ea4be5993fee650d5ec31697bba1061",
                                "sys_user_role": "0341e702936ee610d5ec31697bba1068"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "10a2361993fee650d5ec31697bba1049",
                            "key": {
                                "sys_security_acl": "f292fed593fee650d5ec31697bba1072",
                                "sys_user_role": "0341e702936ee610d5ec31697bba1068"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "25a4225e932e2a10d5ec31697bba10a4",
                            "key": {
                                "sys_security_acl": "221625be9396e290d5ec31697bba10b6",
                                "sys_user_role": "0341e702936ee610d5ec31697bba1068"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "2cdc875393a2ae10d5ec31697bba10c4",
                            "key": {
                                "sys_security_acl": "1fcc039393a2ae10d5ec31697bba10b1",
                                "sys_user_role": "0341e702936ee610d5ec31697bba1068"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "350e75cf93662e10d5ec31697bba10a3",
                            "key": {
                                "sys_security_acl": "a37f325293ee2a10d5ec31697bba108c",
                                "sys_user_role": "03c1ef2e931ea290d5ec31697bba1032"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "38e209b19332aa50d5ec31697bba1030",
                            "key": {
                                "sys_security_acl": "c8e289b19332aa50d5ec31697bba10c9",
                                "sys_user_role": "03c1ef2e931ea290d5ec31697bba1032"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "3dfd3d8f93662e10d5ec31697bba1061",
                            "key": {
                                "sys_security_acl": "70cc754f93662e10d5ec31697bba10ea",
                                "sys_user_role": "f2c1af2e931ea290d5ec31697bba10fa"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "3e936e9193bee650d5ec31697bba10ff",
                            "key": {
                                "sys_security_acl": "3d93e2d193bee650d5ec31697bba1013",
                                "sys_user_role": "03c1ef2e931ea290d5ec31697bba1032"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "4748628893fa6250d5ec31697bba1005",
                            "key": {
                                "sys_security_acl": "7d48a28893fa6250d5ec31697bba10be",
                                "sys_user_role": "f2c1af2e931ea290d5ec31697bba10fa"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "4e4e79cf93662e10d5ec31697bba1031",
                            "key": {
                                "sys_security_acl": "224b71fa931ae290d5ec31697bba106d",
                                "sys_user_role": "0341e702936ee610d5ec31697bba1068"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "4ea16dc193136650d5ec31697bba10cb",
                            "key": {
                                "sys_security_acl": "c6a16dc193136650d5ec31697bba10c6",
                                "sys_user_role": "f2c1af2e931ea290d5ec31697bba10fa"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "57a52531931f2a50d5ec31697bba105d",
                            "key": {
                                "sys_security_acl": "1fa52531931f2a50d5ec31697bba1058",
                                "sys_user_role": "f2c1af2e931ea290d5ec31697bba10fa"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "58c337ac933a2650d5ec31697bba1086",
                            "key": {
                                "sys_security_acl": "9fb337ac933a2650d5ec31697bba107f",
                                "sys_user_role": "f2c1af2e931ea290d5ec31697bba10fa"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "59f3fe5993fee650d5ec31697bba102a",
                            "key": {
                                "sys_security_acl": "24f3b61993fee650d5ec31697bba10f5",
                                "sys_user_role": "0341e702936ee610d5ec31697bba1068"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "5ace790393a62e10d5ec31697bba1026",
                            "key": {
                                "sys_security_acl": "2dcef50393a62e10d5ec31697bba1080",
                                "sys_user_role": "f2c1af2e931ea290d5ec31697bba10fa"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "643e69c793262e10d5ec31697bba1055",
                            "key": {
                                "sys_security_acl": "d3f3aeda932e2a10d5ec31697bba10b0",
                                "sys_user_role": "f2c1af2e931ea290d5ec31697bba10fa"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "64e9bb4a93eee610d5ec31697bba1014",
                            "key": {
                                "sys_security_acl": "c2a97f0a93eee610d5ec31697bba10dd",
                                "sys_user_role": "0341e702936ee610d5ec31697bba1068"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "68a97ad593322a50d5ec31697bba1060",
                            "key": {
                                "sys_security_acl": "ef993e5593322a50d5ec31697bba1065",
                                "sys_user_role": "03c1ef2e931ea290d5ec31697bba1032"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "6df8ebce936ee610d5ec31697bba1080",
                            "key": {
                                "sys_security_acl": "e30ba67e931ee290d5ec31697bba1031",
                                "sys_user_role": "0341e702936ee610d5ec31697bba1068"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "72f5aa9593bee650d5ec31697bba10db",
                            "key": {
                                "sys_security_acl": "f1f5629593bee650d5ec31697bba10c1",
                                "sys_user_role": "f2c1af2e931ea290d5ec31697bba10fa"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "78ac986b932aae10d5ec31697bba1065",
                            "key": {
                                "sys_security_acl": "04ac546b932aae10d5ec31697bba1006",
                                "sys_user_role": "03c1ef2e931ea290d5ec31697bba1032"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "82f46a5e932e2a10d5ec31697bba10bb",
                            "key": {
                                "sys_security_acl": "15e3eada932e2a10d5ec31697bba10c9",
                                "sys_user_role": "f2c1af2e931ea290d5ec31697bba10fa"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "925eb5cf93662e10d5ec31697bba10f9",
                            "key": {
                                "sys_security_acl": "d15ebdcf93662e10d5ec31697bba10a8",
                                "sys_user_role": "f2c1af2e931ea290d5ec31697bba10fa"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "92a16dc193136650d5ec31697bba10e3",
                            "key": {
                                "sys_security_acl": "9aa16dc193136650d5ec31697bba10df",
                                "sys_user_role": "f2c1af2e931ea290d5ec31697bba10fa"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "94c46b8a936ee610d5ec31697bba10fe",
                            "key": {
                                "sys_security_acl": "ba4b71fa931ae290d5ec31697bba1082",
                                "sys_user_role": "0341e702936ee610d5ec31697bba1068"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "96123ee29336ae50d5ec31697bba104e",
                            "key": {
                                "sys_security_acl": "d512f2269336ae50d5ec31697bba1080",
                                "sys_user_role": "0341e702936ee610d5ec31697bba1068"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "9aa16dc193136650d5ec31697bba10d4",
                            "key": {
                                "sys_security_acl": "92a16dc193136650d5ec31697bba10d1",
                                "sys_user_role": "f2c1af2e931ea290d5ec31697bba10fa"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "9ea16dc193136650d5ec31697bba10db",
                            "key": {
                                "sys_security_acl": "96a16dc193136650d5ec31697bba10d8",
                                "sys_user_role": "f2c1af2e931ea290d5ec31697bba10fa"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "a37db58f93662e10d5ec31697bba1000",
                            "key": {
                                "sys_security_acl": "2b7f325293ee2a10d5ec31697bba1081",
                                "sys_user_role": "f2c1af2e931ea290d5ec31697bba10fa"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "ad496cc293db6a50d5ec31697bba105a",
                            "key": {
                                "sys_security_acl": "b049240693db6a50d5ec31697bba10a9",
                                "sys_user_role": "03c1ef2e931ea290d5ec31697bba1032"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "b58245719332aa50d5ec31697bba1067",
                            "key": {
                                "sys_security_acl": "b48209719332aa50d5ec31697bba10af",
                                "sys_user_role": "03c1ef2e931ea290d5ec31697bba1032"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "b8beb9cf93662e10d5ec31697bba10da",
                            "key": {
                                "sys_security_acl": "b24b71fa931ae290d5ec31697bba1091",
                                "sys_user_role": "0341e702936ee610d5ec31697bba1068"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "b9b93ad593322a50d5ec31697bba1085",
                            "key": {
                                "sys_security_acl": "41b976d593322a50d5ec31697bba10e3",
                                "sys_user_role": "03c1ef2e931ea290d5ec31697bba1032"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "b9f46a5e932e2a10d5ec31697bba10ac",
                            "key": {
                                "sys_security_acl": "a414621e932e2a10d5ec31697bba1012",
                                "sys_user_role": "f2c1af2e931ea290d5ec31697bba10fa"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "bf4181319332aa50d5ec31697bba10b8",
                            "key": {
                                "sys_security_acl": "a24141319332aa50d5ec31697bba10b0",
                                "sys_user_role": "f2c1af2e931ea290d5ec31697bba10fa"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "c704b29993fee650d5ec31697bba1044",
                            "key": {
                                "sys_security_acl": "2604b29993fee650d5ec31697bba1070",
                                "sys_user_role": "0341e702936ee610d5ec31697bba1068"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "cb7d358f93662e10d5ec31697bba106e",
                            "key": {
                                "sys_security_acl": "143d318f93662e10d5ec31697bba1085",
                                "sys_user_role": "03c1ef2e931ea290d5ec31697bba1032"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "cba7ea1993bee650d5ec31697bba10d7",
                            "key": {
                                "sys_security_acl": "5ea7a25993bee650d5ec31697bba1016",
                                "sys_user_role": "f2c1af2e931ea290d5ec31697bba10fa"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "d243776c933a2650d5ec31697bba10bb",
                            "key": {
                                "sys_security_acl": "3c4373ac933a2650d5ec31697bba1020",
                                "sys_user_role": "03c1ef2e931ea290d5ec31697bba1032"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "dc893e9593322a50d5ec31697bba100a",
                            "key": {
                                "sys_security_acl": "53793e9593322a50d5ec31697bba10b3",
                                "sys_user_role": "0341e702936ee610d5ec31697bba1068"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "de0d6ee993f26a50d5ec31697bba1087",
                            "key": {
                                "sys_security_acl": "990d6ee993f26a50d5ec31697bba109b",
                                "sys_user_role": "0341e702936ee610d5ec31697bba1068"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "df4f387d93fe6a50d5ec31697bba1081",
                            "key": {
                                "sys_security_acl": "424f747d93fe6a50d5ec31697bba1006",
                                "sys_user_role": "03c1ef2e931ea290d5ec31697bba1032"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "e169369193322a50d5ec31697bba10a9",
                            "key": {
                                "sys_security_acl": "3359fe5593322a50d5ec31697bba107f",
                                "sys_user_role": "0341e702936ee610d5ec31697bba1068"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "ed0944d293f22e50d5ec31697bba1007",
                            "key": {
                                "sys_security_acl": "ac09ccd293f22e50d5ec31697bba10c1",
                                "sys_user_role": "f2c1af2e931ea290d5ec31697bba10fa"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "f239dce3932aae10d5ec31697bba10e6",
                            "key": {
                                "sys_security_acl": "ad399427932aae10d5ec31697bba10d7",
                                "sys_user_role": "03c1ef2e931ea290d5ec31697bba1032"
                            }
                        },
                        {
                            "table": "sys_security_acl_role",
                            "id": "fb595255937ee650d5ec31697bba1078",
                            "key": {
                                "sys_security_acl": "f72563ca936ee610d5ec31697bba10ec",
                                "sys_user_role": "03c1ef2e931ea290d5ec31697bba1032"
                            }
                        },
                        {
                            "table": "sys_user_role_contains",
                            "id": "3c166e76931ee290d5ec31697bba10a2",
                            "key": {
                                "role": "f2c1af2e931ea290d5ec31697bba10fa",
                                "contains": "03c1ef2e931ea290d5ec31697bba1032"
                            }
                        },
                        {
                            "table": "sys_user_role_contains",
                            "id": "ff61ab46936ee610d5ec31697bba10e9",
                            "key": {
                                "role": "03c1ef2e931ea290d5ec31697bba1032",
                                "contains": "0341e702936ee610d5ec31697bba1068"
                            }
                        }
                    ];
            }
        }
    }
}
