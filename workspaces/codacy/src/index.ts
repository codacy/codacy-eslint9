import { run } from "codacy-seed"

import { engineImpl } from "codacy/src/engineImpl.ts"

import {  debug } from "lib/utils/logging.ts";


debug("index.ts")
run(engineImpl)
