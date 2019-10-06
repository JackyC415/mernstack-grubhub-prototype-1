
import React from 'react';
import { Dialog, DialogActionsBar } from '@progress/kendo-react-dialogs';
import { Input, NumericTextBox } from '@progress/kendo-react-inputs';

export default class DialogContaincer extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
          productInEdit: this.props.dataItem || null
      };
  }
  handleSubmit(event) {
      event.preventDefault();
  }

  onDialogInputChange = (event) => {
      let target = event.target;
      const value = target.value;
      const name = target.props ? target.props.name : target.name;

      const edited = this.state.productInEdit;
      edited[name] = value;

      this.setState({
          productInEdit: edited
      });
  }

  render() {
      return (
        <Dialog
            onClose={this.props.cancel}
        >
            <form onSubmit={this.handleSubmit}>
                <div style={{ marginBottom: '1rem' }}>
                    <label>
                    Name<br />
                    <Input
                        type="text"
                        name="p_name"
                        value={this.state.productInEdit.p_name || ''}
                        onChange={this.onDialogInputChange}
                    />
                    </label>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>
                    Description<br />
                    <Input
                        type="text"
                        name="p_description"
                        value={this.state.productInEdit.p_description || ''}
                        onChange={this.onDialogInputChange}
                    />
                    </label>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>
                    Image<br />
                    <Input
                        type="text"
                        name="p_image"
                        value={this.state.productInEdit.p_image || ''}
                        onChange={this.onDialogInputChange}
                    />
                    </label>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>
                    Price<br />
                    <Input
                        type="text"
                        name="p_price"
                        value={this.state.productInEdit.p_price || ''}
                        onChange={this.onDialogInputChange}
                    />
                    </label>
                </div>
                <div style={{ marginBottom: '1rem' }}>
                    <label>
                    Quantity<br />
                    <NumericTextBox
                        name="p_quantity"
                        value={this.state.productInEdit.p_quantity || 0}
                        onChange={this.onDialogInputChange}
                    />
                    </label>
                </div>
            </form>
            <DialogActionsBar>
                <button
                    className="k-button"
                    onClick={this.props.cancel}
                >
                    Cancel
                </button>
                <button
                    className="k-button k-primary"
                    onClick={this.props.save}
                >
                    Save
                </button>
            </DialogActionsBar>
        </Dialog>
    );
  }
}
