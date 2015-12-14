class FormattingUtilities {
      formatDollarAmount(x) {
        x = Math.round(x);
        let prefix = '$';
        if (x < 0.) prefix = '-$';
        x = Math.abs(x);
        let val = prefix + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");

        return val;
  }
}

export default new FormattingUtilities();