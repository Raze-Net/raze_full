const TransferProver = require('../prover/transfer.js');
const RedeemProver = require('../prover/redeem.js');

class Service {
    constructor() {
        var transfer = new TransferProver();
        var redeem = new RedeemProver();

        this.proveTransfer = (CLn, CRn, C, D, y, epoch, sk, r, bTransfer, bDiff, index) => {
            var statement = {};
            statement['CLn'] = CLn;
            statement['CRn'] = CRn;
            statement['C'] = C;
            statement['D'] = D;
            statement['y'] = y;
            statement['epoch'] = epoch;

            var witness = {};
            witness['sk'] = sk;
            witness['r'] = r;
            witness['bTransfer'] = bTransfer;
            witness['bDiff'] = bDiff;
            witness['index'] = index;

            return transfer.generateProof(statement, witness).serialize();
        }

        this.proveRedeem = (CLn, CRn, y, epoch, sender, sk, bDiff) => {
            var statement = {};
            statement['CLn'] = CLn;
            statement['CRn'] = CRn;
            statement['y'] = y;
            statement['epoch'] = epoch;
            statement['sender'] = sender;

            var witness = {};
            witness['sk'] = sk;
            witness['bDiff'] = bDiff;

            return redeem.generateProof(statement, witness).serialize();
        }
    }
}

module.exports = Service;
