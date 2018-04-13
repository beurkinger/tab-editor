state = {
  tabs : {
    byId : {
      1 : {
        id : 1,
        title: 'tab 1' ,
        lineIds : [1, 2] 
      }
    },
    allIds : [1]
  },
  lines : {
    byId : {
      1 : {
        id : 1,
        name: 'A' ,
        notes: Array.from({ length: 16 }, () => '-')  
      },
      2 : {
        id : 2,
        name: 'E',
        notes: Array.from({ length: 16 }, () => '-')  
      },
    },
    allIds : [1, 2]
  },
}


   // Add lines to the store and return the new lines id
  //  addLines = (lineNames = [], numberOfNotes = 0) => {
  //   const biggestId = this.getBiggestId(this.state.lines.allIds);
  //   const linesById = lineNames.reduce((accumulator, name, i) => {
  //     const id = biggestId + i + 1;
  //     const notes = Array.from({length: numberOfNotes}, () => '-');
  //     const line = { id, name, notes };
  //     return { ...accumulator, [id]: line };
  //   }, {});
  //   const lineIds = Object.keys(linesById);
  //   const lines = {
  //     ...this.state.lines,
  //     byId: { ...this.state.lines.byId, ...linesById },
  //     allIds: [...this.state.lines.allIds, ...lineIds]
  //   };
  //   this.setState({ lines });
  //   return lineIds;
  // };


  // updateNote (lineId, noteId, content) {
  //   const line = this.state.lines.byId[lineId];
  //   const updatedNotes = line.notes.map((note, i) => (i === noteId ? content : note));
  //   const updatedLine = { ...line, notes: updatedNotes };
  //   const lines = {
  //     ...this.state.lines,
  //     byId: { ...this.state.lines.byId, [lineId]: updatedLine }
  //   };
  //   this.setState({ lines });
  // }



  // Add a tab to the store and return the new tab id
  // addTab = (lineNames = ['e', 'A', 'D', 'G', 'B', 'E'], length = 32) => {
  //   const id = this.getBiggestId(this.state.tabs.allIds) + 1;
  //   const name = `tab ${id}`;
  //   const lineIds = this.addLines(lineNames, length)
  //   const tab = { id, name, lineIds, length };
  //   const tabs = {
  //     ...this.state.tabs,
  //     byId: { ...this.state.tabs.byId, [id]: tab },
  //     allIds: [...this.state.tabs.allIds, id]
  //   };
  //   this.setState({ tabs });
  //   return id;
  // }