// SPDX-FileCopyrightText: Copyright (C) 2023-2026 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import * as Comlink from "@lichtblick/comlink";
import { IterableSourceInitializeArgs } from "@lichtblick/suite-base/players/IterablePlayer/IIterableSource";
import { WorkerSerializedIterableSourceWorker } from "@lichtblick/suite-base/players/IterablePlayer/WorkerSerializedIterableSourceWorker";

import { RosDb3IterableSource } from "./RosDb3IterableSource";

export function initialize(
  args: IterableSourceInitializeArgs,
): WorkerSerializedIterableSourceWorker {
  if (args.files) {
    const source = new RosDb3IterableSource({ type: "files", files: args.files });
    const wrapped = new WorkerSerializedIterableSourceWorker(source);
    return Comlink.proxy(wrapped);
  }
  if (args.file) {
    const source = new RosDb3IterableSource({ type: "files", files: [args.file] });
    const wrapped = new WorkerSerializedIterableSourceWorker(source);
    return Comlink.proxy(wrapped);
  }
  if (args.url) {
    const source = new RosDb3IterableSource({ type: "remote", url: args.url });
    const wrapped = new WorkerSerializedIterableSourceWorker(source);
    return Comlink.proxy(wrapped);
  }
  throw new Error("files or url required");
}

Comlink.expose(initialize);
