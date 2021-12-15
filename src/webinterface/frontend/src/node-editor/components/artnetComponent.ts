import * as Rete from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { NumControl } from "../controls/numControl";
import { FrameSocket, NumSocket } from "../sockets/sockets";

export class ArtnetComponent extends Rete.Component {
    constructor() {
        super("ArtNet");
    }

    async builder(node: Rete.Node) {
        const in1 = new Rete.Input('port', "Port", NumSocket);
        const out1 = new Rete.Output('frame', "Frame", FrameSocket);

        in1.addControl(new NumControl(this.editor, 'port'));
        
        node.addInput(in1)
            .addOutput(out1);

        in1.control.putData('port', 6454);
    }

    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
        // do nothing for now
    }
}