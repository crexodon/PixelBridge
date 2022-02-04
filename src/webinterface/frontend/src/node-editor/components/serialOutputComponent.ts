import * as Rete from "rete";
import { NodeData, WorkerInputs, WorkerOutputs } from "rete/types/core/data";
import { NumControl } from "../controls/numControl";
import { TextControl } from "../controls/textControl";
import { NumSocket, RawPixelArrSocket, TextSocket } from "../sockets/sockets";

export class SerialOutputComponent extends Rete.Component {
    constructor() {
        super("Serial Output");
    }

    async builder(node: Rete.Node) {
        const pixelIn = new Rete.Input('rawPixIn', "RawPixels[]", RawPixelArrSocket);
        const portIn = new Rete.Input('serPort', "Serial Port", TextSocket);
        const baudIn = new Rete.Input('serBaud', "Serial Baudrate", NumSocket);

        portIn.addControl(new TextControl(this.editor, 'serialPort'));
        baudIn.addControl(new NumControl(this.editor, 'serialBaudrate'));

        node.addInput(portIn);
        node.addInput(baudIn);
        node.addInput(pixelIn);

        baudIn.control.putData('serialBaudrate', 115200);
    }

    worker(node: NodeData, inputs: WorkerInputs, outputs: WorkerOutputs) {
        // do nothing for now
    }
}