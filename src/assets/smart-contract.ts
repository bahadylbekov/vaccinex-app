export const contractInit = { "prim": "Pair", "args": [ { "string": "tz1ehmD34HoQEbSGb8sLsKeFKJXE5BRpakUs" }, [] ] }

export const contractJSON = [
    {
      "prim": "storage",
      "args": [
        {
          "prim": "pair",
          "args": [
            { "prim": "address", "annots": [ "%creator" ] },
            {
              "prim": "map",
              "args": [
                { "prim": "int" },
                {
                  "prim": "pair",
                  "args": [
                    {
                      "prim": "pair",
                      "args": [
                        { "prim": "timestamp", "annots": [ "%auction" ] },
                        { "prim": "pair", "args": [ { "prim": "int", "annots": [ "%creatureId" ] }, { "prim": "bool", "annots": [ "%isNew" ] } ] }
                      ]
                    },
                    {
                      "prim": "pair",
                      "args": [
                        { "prim": "address", "annots": [ "%owner" ] },
                        { "prim": "pair", "args": [ { "prim": "mutez", "annots": [ "%price" ] }, { "prim": "string", "annots": [ "%tokenURI" ] } ] }
                      ]
                    }
                  ]
                }
              ],
              "annots": [ "%creature" ]
            }
          ]
        }
      ]
    },
    {
      "prim": "parameter",
      "args": [
        {
          "prim": "or",
          "args": [
            {
              "prim": "pair",
              "args": [
                {
                  "prim": "pair",
                  "args": [
                    { "prim": "timestamp", "annots": [ "%auction" ] },
                    { "prim": "pair", "args": [ { "prim": "int", "annots": [ "%creatureId" ] }, { "prim": "bool", "annots": [ "%isNew" ] } ] }
                  ]
                },
                {
                  "prim": "pair",
                  "args": [
                    { "prim": "address", "annots": [ "%owner" ] },
                    { "prim": "pair", "args": [ { "prim": "mutez", "annots": [ "%price" ] }, { "prim": "string", "annots": [ "%tokenURI" ] } ] }
                  ]
                }
              ],
              "annots": [ "%build" ]
            },
            {
              "prim": "or",
              "args": [
                { "prim": "pair", "args": [ { "prim": "int", "annots": [ "%creatureId" ] }, { "prim": "mutez", "annots": [ "%price" ] } ], "annots": [ "%buy" ] },
                { "prim": "pair", "args": [ { "prim": "int", "annots": [ "%creatureId" ] }, { "prim": "mutez", "annots": [ "%price" ] } ], "annots": [ "%sell" ] }
              ]
            }
          ]
        }
      ]
    },
    {
      "prim": "code",
      "args": [
        [
          { "prim": "DUP" },
          { "prim": "CDR" },
          { "prim": "SWAP" },
          { "prim": "CAR" },
          {
            "prim": "IF_LEFT",
            "args": [
              [
                [
                  { "prim": "SENDER" },
                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                  { "prim": "DUP" },
                  { "prim": "DUG", "args": [ { "int": "3" } ] },
                  { "prim": "CAR" },
                  { "prim": "COMPARE" },
                  { "prim": "EQ" },
                  {
                    "prim": "IF",
                    "args": [
                      [ [] ],
                      [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: self.data.creator == sp.sender" } ] }, { "prim": "FAILWITH" } ] ]
                    ]
                  },
                  { "prim": "DUP" },
                  { "prim": "CAR" },
                  { "prim": "CDR" },
                  { "prim": "CDR" },
                  {
                    "prim": "IF",
                    "args": [ [ [] ], [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: params.creature.isNew" } ] }, { "prim": "FAILWITH" } ] ] ]
                  },
                  { "prim": "SWAP" },
                  { "prim": "DUP" },
                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                  { "prim": "DUP" },
                  { "prim": "CAR" },
                  { "prim": "SWAP" },
                  { "prim": "CDR" },
                  { "prim": "DIG", "args": [ { "int": "2" } ] },
                  { "prim": "DUP" },
                  { "prim": "DUG", "args": [ { "int": "3" } ] },
                  { "prim": "SOME" },
                  { "prim": "DIG", "args": [ { "int": "3" } ] },
                  { "prim": "DUP" },
                  { "prim": "DUG", "args": [ { "int": "4" } ] },
                  { "prim": "CAR" },
                  { "prim": "CDR" },
                  { "prim": "CAR" },
                  { "prim": "UPDATE" },
                  { "prim": "SWAP" },
                  { "prim": "PAIR" },
                  { "prim": "DUG", "args": [ { "int": "2" } ] },
                  { "prim": "DROP", "args": [ { "int": "2" } ] },
                  { "prim": "NIL", "args": [ { "prim": "operation" } ] }
                ]
              ],
              [
                {
                  "prim": "IF_LEFT",
                  "args": [
                    [
                      [
                        { "prim": "SWAP" },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "2" } ] },
                        { "prim": "CDR" },
                        { "prim": "SWAP" },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "2" } ] },
                        { "prim": "CAR" },
                        { "prim": "GET" },
                        { "prim": "IF_NONE", "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Get-item:28" } ] }, { "prim": "FAILWITH" } ] ], [] ] },
                        { "prim": "CDR" },
                        { "prim": "CDR" },
                        { "prim": "CAR" },
                        { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
                        { "prim": "COMPARE" },
                        { "prim": "LT" },
                        {
                          "prim": "IF",
                          "args": [
                            [ [] ],
                            [
                              [
                                { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: sp.tez(0) < self.data.creature[params.creatureId].price" } ] },
                                { "prim": "FAILWITH" }
                              ]
                            ]
                          ]
                        },
                        { "prim": "DUP" },
                        { "prim": "CDR" },
                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "3" } ] },
                        { "prim": "CDR" },
                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "3" } ] },
                        { "prim": "CAR" },
                        { "prim": "GET" },
                        { "prim": "IF_NONE", "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Get-item:28" } ] }, { "prim": "FAILWITH" } ] ], [] ] },
                        { "prim": "CDR" },
                        { "prim": "CDR" },
                        { "prim": "CAR" },
                        { "prim": "COMPARE" },
                        { "prim": "LE" },
                        {
                          "prim": "IF",
                          "args": [
                            [ [] ],
                            [
                              [
                                { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: self.data.creature[params.creatureId].price <= params.price" } ] },
                                { "prim": "FAILWITH" }
                              ]
                            ]
                          ]
                        },
                        { "prim": "DUP" },
                        { "prim": "CDR" },
                        { "prim": "AMOUNT" },
                        { "prim": "COMPARE" },
                        { "prim": "EQ" },
                        {
                          "prim": "IF",
                          "args": [
                            [ [] ],
                            [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: sp.amount == params.price" } ] }, { "prim": "FAILWITH" } ] ]
                          ]
                        },
                        { "prim": "NIL", "args": [ { "prim": "operation" } ] },
                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "3" } ] },
                        { "prim": "CDR" },
                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "3" } ] },
                        { "prim": "CAR" },
                        { "prim": "GET" },
                        { "prim": "IF_NONE", "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Get-item:28" } ] }, { "prim": "FAILWITH" } ] ], [] ] },
                        { "prim": "CDR" },
                        { "prim": "CAR" },
                        { "prim": "CONTRACT", "args": [ { "prim": "unit" } ] },
                        { "prim": "IF_NONE", "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "unit" }, { "prim": "Unit" } ] }, { "prim": "FAILWITH" } ] ], [ [] ] ] },
                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "3" } ] },
                        { "prim": "CDR" },
                        { "prim": "PUSH", "args": [ { "prim": "unit" }, { "prim": "Unit" } ] },
                        { "prim": "TRANSFER_TOKENS" },
                        { "prim": "CONS" },
                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "3" } ] },
                        { "prim": "DUP" },
                        { "prim": "CAR" },
                        { "prim": "SWAP" },
                        { "prim": "CDR" },
                        { "prim": "DUP" },
                        { "prim": "DIG", "args": [ { "int": "4" } ] },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "5" } ] },
                        { "prim": "CAR" },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "2" } ] },
                        { "prim": "GET" },
                        { "prim": "IF_NONE", "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "set_in_top-any" } ] }, { "prim": "FAILWITH" } ] ], [] ] },
                        { "prim": "DUP" },
                        { "prim": "CAR" },
                        { "prim": "SWAP" },
                        { "prim": "CDR" },
                        { "prim": "CDR" },
                        { "prim": "SENDER" },
                        { "prim": "PAIR" },
                        { "prim": "SWAP" },
                        { "prim": "PAIR" },
                        { "prim": "SOME" },
                        { "prim": "SWAP" },
                        { "prim": "UPDATE" },
                        { "prim": "SWAP" },
                        { "prim": "PAIR" },
                        { "prim": "DUG", "args": [ { "int": "3" } ] },
                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                        { "prim": "DROP" },
                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "3" } ] },
                        { "prim": "CDR" },
                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "3" } ] },
                        { "prim": "CAR" },
                        { "prim": "GET" },
                        { "prim": "IF_NONE", "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Get-item:28" } ] }, { "prim": "FAILWITH" } ] ], [] ] },
                        { "prim": "CAR" },
                        { "prim": "CDR" },
                        { "prim": "CDR" },
                        {
                          "prim": "IF",
                          "args": [
                            [
                              [
                                { "prim": "DIG", "args": [ { "int": "2" } ] },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "3" } ] },
                                { "prim": "DUP" },
                                { "prim": "CAR" },
                                { "prim": "SWAP" },
                                { "prim": "CDR" },
                                { "prim": "DUP" },
                                { "prim": "DIG", "args": [ { "int": "4" } ] },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "5" } ] },
                                { "prim": "CAR" },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "2" } ] },
                                { "prim": "GET" },
                                {
                                  "prim": "IF_NONE",
                                  "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "set_in_top-any" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                },
                                { "prim": "DUP" },
                                { "prim": "CDR" },
                                { "prim": "SWAP" },
                                { "prim": "CAR" },
                                { "prim": "DUP" },
                                { "prim": "CAR" },
                                { "prim": "SWAP" },
                                { "prim": "CDR" },
                                { "prim": "CAR" },
                                { "prim": "PUSH", "args": [ { "prim": "bool" }, { "prim": "False" } ] },
                                { "prim": "SWAP" },
                                { "prim": "PAIR" },
                                { "prim": "SWAP" },
                                { "prim": "PAIR" },
                                { "prim": "PAIR" },
                                { "prim": "SOME" },
                                { "prim": "SWAP" },
                                { "prim": "UPDATE" },
                                { "prim": "SWAP" },
                                { "prim": "PAIR" },
                                { "prim": "DUG", "args": [ { "int": "3" } ] },
                                { "prim": "DIG", "args": [ { "int": "2" } ] },
                                { "prim": "DROP" },
                                { "prim": "DIG", "args": [ { "int": "2" } ] },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "3" } ] },
                                { "prim": "DUP" },
                                { "prim": "CAR" },
                                { "prim": "SWAP" },
                                { "prim": "CDR" },
                                { "prim": "DUP" },
                                { "prim": "DIG", "args": [ { "int": "4" } ] },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "5" } ] },
                                { "prim": "CAR" },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "2" } ] },
                                { "prim": "GET" },
                                {
                                  "prim": "IF_NONE",
                                  "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "set_in_top-any" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                },
                                { "prim": "DUP" },
                                { "prim": "CDR" },
                                { "prim": "SWAP" },
                                { "prim": "CAR" },
                                { "prim": "CDR" },
                                { "prim": "NOW" },
                                { "prim": "PUSH", "args": [ { "prim": "int" }, { "int": "20" } ] },
                                { "prim": "ADD" },
                                { "prim": "PAIR" },
                                { "prim": "PAIR" },
                                { "prim": "SOME" },
                                { "prim": "SWAP" },
                                { "prim": "UPDATE" },
                                { "prim": "SWAP" },
                                { "prim": "PAIR" },
                                { "prim": "DUG", "args": [ { "int": "3" } ] },
                                { "prim": "DIG", "args": [ { "int": "2" } ] },
                                { "prim": "DROP" }
                              ]
                            ],
                            [ [] ]
                          ]
                        },
                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "3" } ] },
                        { "prim": "CDR" },
                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "3" } ] },
                        { "prim": "CAR" },
                        { "prim": "GET" },
                        { "prim": "IF_NONE", "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Get-item:28" } ] }, { "prim": "FAILWITH" } ] ], [] ] },
                        { "prim": "CAR" },
                        { "prim": "CAR" },
                        { "prim": "NOW" },
                        { "prim": "COMPARE" },
                        { "prim": "LE" },
                        {
                          "prim": "IF",
                          "args": [
                            [ [] ],
                            [
                              [
                                { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: sp.now <= self.data.creature[params.creatureId].auction" } ] },
                                { "prim": "FAILWITH" }
                              ]
                            ]
                          ]
                        },
                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "3" } ] },
                        { "prim": "CDR" },
                        { "prim": "DIG", "args": [ { "int": "2" } ] },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "3" } ] },
                        { "prim": "CAR" },
                        { "prim": "GET" },
                        { "prim": "IF_NONE", "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "Get-item:28" } ] }, { "prim": "FAILWITH" } ] ], [] ] },
                        { "prim": "CAR" },
                        { "prim": "CAR" },
                        { "prim": "NOW" },
                        { "prim": "COMPARE" },
                        { "prim": "LE" },
                        {
                          "prim": "IF",
                          "args": [
                            [
                              [
                                { "prim": "DIG", "args": [ { "int": "2" } ] },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "3" } ] },
                                { "prim": "DUP" },
                                { "prim": "CAR" },
                                { "prim": "SWAP" },
                                { "prim": "CDR" },
                                { "prim": "DUP" },
                                { "prim": "DIG", "args": [ { "int": "4" } ] },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "5" } ] },
                                { "prim": "CAR" },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "2" } ] },
                                { "prim": "GET" },
                                {
                                  "prim": "IF_NONE",
                                  "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "set_in_top-any" } ] }, { "prim": "FAILWITH" } ] ], [] ]
                                },
                                { "prim": "DUP" },
                                { "prim": "CAR" },
                                { "prim": "SWAP" },
                                { "prim": "CDR" },
                                { "prim": "DUP" },
                                { "prim": "CAR" },
                                { "prim": "SWAP" },
                                { "prim": "CDR" },
                                { "prim": "CDR" },
                                { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "1" } ] },
                                { "prim": "DIG", "args": [ { "int": "8" } ] },
                                { "prim": "DUP" },
                                { "prim": "DUG", "args": [ { "int": "9" } ] },
                                { "prim": "CDR" },
                                { "prim": "ADD" },
                                { "prim": "PAIR" },
                                { "prim": "SWAP" },
                                { "prim": "PAIR" },
                                { "prim": "SWAP" },
                                { "prim": "PAIR" },
                                { "prim": "SOME" },
                                { "prim": "SWAP" },
                                { "prim": "UPDATE" },
                                { "prim": "SWAP" },
                                { "prim": "PAIR" },
                                { "prim": "DUG", "args": [ { "int": "3" } ] },
                                { "prim": "DIG", "args": [ { "int": "2" } ] },
                                { "prim": "DROP" }
                              ]
                            ],
                            [ [] ]
                          ]
                        },
                        { "prim": "SWAP" },
                        { "prim": "DROP" }
                      ]
                    ],
                    [
                      [
                        { "prim": "DUP" },
                        { "prim": "CDR" },
                        { "prim": "PUSH", "args": [ { "prim": "mutez" }, { "int": "0" } ] },
                        { "prim": "COMPARE" },
                        { "prim": "LE" },
                        {
                          "prim": "IF",
                          "args": [
                            [ [] ],
                            [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "WrongCondition: sp.tez(0) <= params.price" } ] }, { "prim": "FAILWITH" } ] ]
                          ]
                        },
                        { "prim": "SWAP" },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "2" } ] },
                        { "prim": "DUP" },
                        { "prim": "CAR" },
                        { "prim": "SWAP" },
                        { "prim": "CDR" },
                        { "prim": "DUP" },
                        { "prim": "DIG", "args": [ { "int": "3" } ] },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "4" } ] },
                        { "prim": "CAR" },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "2" } ] },
                        { "prim": "GET" },
                        { "prim": "IF_NONE", "args": [ [ [ { "prim": "PUSH", "args": [ { "prim": "string" }, { "string": "set_in_top-any" } ] }, { "prim": "FAILWITH" } ] ], [] ] },
                        { "prim": "DUP" },
                        { "prim": "CAR" },
                        { "prim": "SWAP" },
                        { "prim": "CDR" },
                        { "prim": "DUP" },
                        { "prim": "CAR" },
                        { "prim": "SWAP" },
                        { "prim": "CDR" },
                        { "prim": "CDR" },
                        { "prim": "DIG", "args": [ { "int": "6" } ] },
                        { "prim": "DUP" },
                        { "prim": "DUG", "args": [ { "int": "7" } ] },
                        { "prim": "CDR" },
                        { "prim": "PAIR" },
                        { "prim": "SWAP" },
                        { "prim": "PAIR" },
                        { "prim": "SWAP" },
                        { "prim": "PAIR" },
                        { "prim": "SOME" },
                        { "prim": "SWAP" },
                        { "prim": "UPDATE" },
                        { "prim": "SWAP" },
                        { "prim": "PAIR" },
                        { "prim": "DUG", "args": [ { "int": "2" } ] },
                        { "prim": "DROP", "args": [ { "int": "2" } ] },
                        { "prim": "NIL", "args": [ { "prim": "operation" } ] }
                      ]
                    ]
                  ]
                }
              ]
            ]
          },
          { "prim": "PAIR" }
        ]
      ]
    }
  ]