// SPDX-FileCopyrightText: Copyright (C) 2023-2024 Bayerische Motoren Werke Aktiengesellschaft (BMW AG)<lichtblick@bmwgroup.com>
// SPDX-License-Identifier: MPL-2.0

// This Source Code Form is subject to the terms of the Mozilla Public
// License, v2.0. If a copy of the MPL was not distributed with this
// file, You can obtain one at http://mozilla.org/MPL/2.0/

import * as Comlink from "@lichtblick/comlink";
import { IterableSourceInitializeArgs } from "@lichtblick/suite-base/players/IterablePlayer/IIterableSource";
import { WorkerIterableSourceWorker } from "@lichtblick/suite-base/players/IterablePlayer/WorkerIterableSourceWorker";

import { RosDb3IterableSource } from "./RosDb3IterableSource";

export function initialize(args: IterableSourceInitializeArgs): WorkerIterableSourceWorker {
  if (args.files) {
    const source = new RosDb3IterableSource({ type: "files", files: args.files });
    const wrapped = new WorkerIterableSourceWorker(source);
    return Comlink.proxy(wrapped);
  } else if (args.file) {
    const source = new RosDb3IterableSource({ type: "files", files: [args.file] });
    const wrapped = new WorkerIterableSourceWorker(source);
    return Comlink.proxy(wrapped);
  } else if (args.url) {
    const source = new RosDb3IterableSource({ type: "remote", url: args.url });
    const wrapped = new WorkerIterableSourceWorker(source);
    return Comlink.proxy(wrapped);
  }

  throw new Error("files or url required");



  // const files = args.file ? [args.file] : args.files;
  // if (!files) {
  //   throw new Error("files required");
  // }
  // const source = new RosDb3IterableSource(files);
  // const wrapped = new WorkerIterableSourceWorker(source);
  // return Comlink.proxy(wrapped);
}

Comlink.expose(initialize);
