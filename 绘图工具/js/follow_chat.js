var g = new dagreD3.graphlib.Graph().setGraph({});

g.setNode("root", {
  label: function() {
    var table = document.createElement("table"),
        tr = d3.select(table).append("tr");
    tr.append("td").text("A");
    tr.append("td").text("B");
    return table;
  },
  padding: 0,
  rx: 5,
  ry: 5
});