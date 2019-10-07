//References: https://www.telerik.com/kendo-react-ui/components/grid/editing/editing-inline/
import React from 'react';
import { GridCell } from '@progress/kendo-react-grid';

export function MyCommandCell({ remove }) {
    return class extends GridCell {
        render() {
            const { dataItem } = this.props;

            return (
                <td className="k-command-cell">
                    <button
                        className="k-button k-grid-remove-command"
                        // eslint-disable-next-line no-restricted-globals
                        onClick={() => confirm('Confirm deleting: ' + dataItem.o_name) &&
                            remove(dataItem)
                        }
                    >
                        Cancel
                    </button>
                </td>
            );
        }
    }
};
