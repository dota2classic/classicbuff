import { css } from "styled-components";
import { colors } from "./styles";

export const reactVirtualizedStyles = css`
  /* Collection default theme */

  .ReactVirtualized__Collection {
  }

  .ReactVirtualized__Collection__innerScrollContainer {
  }

  /* Grid default theme */

  .ReactVirtualized__Grid {
    outline: none;
  }

  .ReactVirtualized__Grid__innerScrollContainer {
  }

  /* Table default theme */

  .ReactVirtualized__Table {
  }

  .ReactVirtualized__Table__Grid {
  }

  .ReactVirtualized__Table__headerRow {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
    border-bottom: 1px solid ${colors.common.menu};
  }
  .ReactVirtualized__Table__row {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-orient: horizontal;
    -webkit-box-direction: normal;
    -ms-flex-direction: row;
    flex-direction: row;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }

  .ReactVirtualized__Table__headerTruncatedText {
    display: inline-block;
    max-width: 100%;
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
  }

  .ReactVirtualized__Table__headerColumn,
  .ReactVirtualized__Table__rowColumn {
    margin-right: 20px;
    min-width: 0px;
  }
  .ReactVirtualized__Table__rowColumn {
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .ReactVirtualized__Table__headerColumn:first-of-type,
  .ReactVirtualized__Table__rowColumn:first-of-type {
    margin-left: 20px;
  }
  .ReactVirtualized__Table__sortableHeaderColumn {
    cursor: pointer;
  }

  .ReactVirtualized__Table__sortableHeaderIconContainer {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    -webkit-box-align: center;
    -ms-flex-align: center;
    align-items: center;
  }
  .ReactVirtualized__Table__sortableHeaderIcon {
    -webkit-box-flex: 0;
    -ms-flex: 0 0 24px;
    flex: 0 0 24px;
    height: 1em;
    width: 1em;
    fill: currentColor;
  }

  /* List default theme */

  .ReactVirtualized__List {
  }

  /*# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbInNvdXJjZS9zdHlsZXMuY3NzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLDhCQUE4Qjs7QUFFOUI7Q0FDQzs7QUFFRDtDQUNDOztBQUVELHdCQUF3Qjs7QUFFeEI7Q0FDQzs7QUFFRDtDQUNDOztBQUVELHlCQUF5Qjs7QUFFekI7Q0FDQzs7QUFFRDtDQUNDOztBQUVEO0VBQ0UsaUJBQWlCO0VBQ2pCLDBCQUEwQjtFQUMxQixxQkFBYztFQUFkLHFCQUFjO0VBQWQsY0FBYztFQUNkLCtCQUFvQjtFQUFwQiw4QkFBb0I7TUFBcEIsd0JBQW9CO1VBQXBCLG9CQUFvQjtFQUNwQiwwQkFBb0I7TUFBcEIsdUJBQW9CO1VBQXBCLG9CQUFvQjtDQUNyQjtBQUNEO0VBQ0UscUJBQWM7RUFBZCxxQkFBYztFQUFkLGNBQWM7RUFDZCwrQkFBb0I7RUFBcEIsOEJBQW9CO01BQXBCLHdCQUFvQjtVQUFwQixvQkFBb0I7RUFDcEIsMEJBQW9CO01BQXBCLHVCQUFvQjtVQUFwQixvQkFBb0I7Q0FDckI7O0FBRUQ7RUFDRSxzQkFBc0I7RUFDdEIsZ0JBQWdCO0VBQ2hCLG9CQUFvQjtFQUNwQix3QkFBd0I7RUFDeEIsaUJBQWlCO0NBQ2xCOztBQUVEOztFQUVFLG1CQUFtQjtFQUNuQixlQUFlO0NBQ2hCO0FBQ0Q7RUFDRSx3QkFBd0I7RUFDeEIsb0JBQW9CO0NBQ3JCOztBQUVEOztFQUVFLGtCQUFrQjtDQUNuQjtBQUNEO0VBQ0UsZ0JBQWdCO0NBQ2pCOztBQUVEO0VBQ0UscUJBQWM7RUFBZCxxQkFBYztFQUFkLGNBQWM7RUFDZCwwQkFBb0I7TUFBcEIsdUJBQW9CO1VBQXBCLG9CQUFvQjtDQUNyQjtBQUNEO0VBQ0Usb0JBQWU7TUFBZixtQkFBZTtVQUFmLGVBQWU7RUFDZixZQUFZO0VBQ1osV0FBVztFQUNYLG1CQUFtQjtDQUNwQjs7QUFFRCx3QkFBd0I7O0FBRXhCO0NBQ0MiLCJmaWxlIjoic3R5bGVzLmNzcyIsInNvdXJjZXNDb250ZW50IjpbIi8qIENvbGxlY3Rpb24gZGVmYXVsdCB0aGVtZSAqL1xuXG4uUmVhY3RWaXJ0dWFsaXplZF9fQ29sbGVjdGlvbiB7XG59XG5cbi5SZWFjdFZpcnR1YWxpemVkX19Db2xsZWN0aW9uX19pbm5lclNjcm9sbENvbnRhaW5lciB7XG59XG5cbi8qIEdyaWQgZGVmYXVsdCB0aGVtZSAqL1xuXG4uUmVhY3RWaXJ0dWFsaXplZF9fR3JpZCB7XG59XG5cbi5SZWFjdFZpcnR1YWxpemVkX19HcmlkX19pbm5lclNjcm9sbENvbnRhaW5lciB7XG59XG5cbi8qIFRhYmxlIGRlZmF1bHQgdGhlbWUgKi9cblxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlIHtcbn1cblxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19HcmlkIHtcbn1cblxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19oZWFkZXJSb3cge1xuICBmb250LXdlaWdodDogNzAwO1xuICB0ZXh0LXRyYW5zZm9ybTogdXBwZXJjYXNlO1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19yb3cge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogcm93O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xufVxuXG4uUmVhY3RWaXJ0dWFsaXplZF9fVGFibGVfX2hlYWRlclRydW5jYXRlZFRleHQge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG4gIG1heC13aWR0aDogMTAwJTtcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbiAgdGV4dC1vdmVyZmxvdzogZWxsaXBzaXM7XG4gIG92ZXJmbG93OiBoaWRkZW47XG59XG5cbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9faGVhZGVyQ29sdW1uLFxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19yb3dDb2x1bW4ge1xuICBtYXJnaW4tcmlnaHQ6IDEwcHg7XG4gIG1pbi13aWR0aDogMHB4O1xufVxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19yb3dDb2x1bW4ge1xuICB0ZXh0LW92ZXJmbG93OiBlbGxpcHNpcztcbiAgd2hpdGUtc3BhY2U6IG5vd3JhcDtcbn1cblxuLlJlYWN0VmlydHVhbGl6ZWRfX1RhYmxlX19oZWFkZXJDb2x1bW46Zmlyc3Qtb2YtdHlwZSxcbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9fcm93Q29sdW1uOmZpcnN0LW9mLXR5cGUge1xuICBtYXJnaW4tbGVmdDogMTBweDtcbn1cbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9fc29ydGFibGVIZWFkZXJDb2x1bW4ge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9fc29ydGFibGVIZWFkZXJJY29uQ29udGFpbmVyIHtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbn1cbi5SZWFjdFZpcnR1YWxpemVkX19UYWJsZV9fc29ydGFibGVIZWFkZXJJY29uIHtcbiAgZmxleDogMCAwIDI0cHg7XG4gIGhlaWdodDogMWVtO1xuICB3aWR0aDogMWVtO1xuICBmaWxsOiBjdXJyZW50Q29sb3I7XG59XG5cbi8qIExpc3QgZGVmYXVsdCB0aGVtZSAqL1xuXG4uUmVhY3RWaXJ0dWFsaXplZF9fTGlzdCB7XG59XG4iXX0= */
`;
